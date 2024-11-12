import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: [true, "Amount is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    expenseType: {
        type: String,
        enum: ["Punctual", "Subscription"],
        required: [true, "Expense type is required"],
    },
    subscriptionDetails: {
        frequency: {
            type: String,
            enum: ["Monthly", "Yearly"],
            required: function() {
                return this.expenseType === "Subscription";
            },
        },
        dayOfMonth: {
            type: Number,
            min: 1,
            max: 31,
            required: function() {
                return this.expenseType === "Subscription" && this.subscriptionDetails.frequency === "Monthly";
            },
        },
    },
    category: {
        type: String,
        enum: ["Groceries", "Leisure", "Electronics", "Utilities", "Clothing", "Health", "Other"],
        required: [true, "Category is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
