import express from "express";
import { z } from "zod";
import db from "@repo/db/client";
const cors = require("cors");

const app = express();

const paymentInformation = z.object({
  token: z.string(),
  userId: z.number(),
  amount: z.number().positive("Amount must be positive"),
});

app.use(express.json());

app.post("/hdfcWebhook", async (req, res) => {
  try {
    //TODO: Add zod validation here? ✅
    const validatedData = paymentInformation.parse(req.body);
    const paymentInformationSchema = {
      token: validatedData.token,
      userId: validatedData.userId,
      amount: validatedData.amount,
    };
    // Update balance in db, add txn ✅
    await db.$transaction([
      db.balance.update({
        where: {
          userId: paymentInformationSchema.userId,
        },
        data: {
          amount: {
            increment: paymentInformationSchema.amount,
          },
        },
      }),

      db.onRampTransaction.update({
        where: {
          token: paymentInformationSchema.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);
    res.json({
      message: "Captured",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
      return;
    }
    res.status(500).json({ error: "Internal server error" });
    return;
  }
});

app.use(cors());

app.listen(5000, () => {
  console.log("Server started on port 5000");
});