import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTodos = query({
    handler: async (ctx) => {
        return await ctx.db.query("todos").order("desc").collect()
    }
})

export const addTodo = mutation({
    args: {text: v.string()},
    handler: async (ctx, args) => {
        const taskId = await ctx.db.insert("todos", {text: args.text, isCompleted: false})
        return taskId;
    }
});

export const ToggleTodo = mutation({
    args: {id: v.id("todos")},
    handler: async (ctx, args) => {
        const {id} = args;
        const todo = await ctx.db.get(id);
        if(!todo){
            throw new ConvexError("Todo not found")
        }

        await ctx.db.patch(id, {isCompleted: !todo.isCompleted})
    }
});

export const deleteTodo = mutation({
    args: {id: v.id("todos")},
    handler: async (ctx, args) => {
        const {id} = args;
        const todo = await ctx.db.get(id);
        if(!todo){
            throw new ConvexError("Todo not found")
        }

        await ctx.db.delete(id)
    }
});

export const updateTodo = mutation({
    args: {id: v.id("todos"), text: v.string()},
    handler: async (ctx, args) => {
        const {id, text} = args;
        await ctx.db.patch(id, {text: text})
    }
});

export const clearAllTodos = mutation({
    handler: async (ctx) => {
        const todos = await ctx.db.query("todos").collect();

        for(const todo of todos){
            await ctx.db.delete(todo._id);
        }

        return {deletedCount: todos.length};
    },
});