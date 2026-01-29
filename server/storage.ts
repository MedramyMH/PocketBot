import { type User, type InsertUser, type Trade, type InsertTrade, trades, users } from "../shared/schema";
import { randomUUID } from "crypto";
import { desc, eq } from "drizzle-orm";
import { db } from "./db";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Trade operations
  createTrade(trade: InsertTrade): Promise<Trade>;
  updateTrade(id: string, updates: Partial<InsertTrade>): Promise<Trade | undefined>;
  getTrade(id: string): Promise<Trade | undefined>;
  getRecentTrades(limit: number): Promise<Trade[]>;
  getTradeStats(): Promise<{ wins: number; losses: number; total: number; winRate: number }>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createTrade(trade: InsertTrade): Promise<Trade> {
    const [newTrade] = await db.insert(trades).values(trade).returning();
    return newTrade;
  }

  async updateTrade(id: string, updates: Partial<InsertTrade>): Promise<Trade | undefined> {
    const [updated] = await db
      .update(trades)
      .set(updates)
      .where(eq(trades.id, id))
      .returning();
    return updated;
  }

  async getTrade(id: string): Promise<Trade | undefined> {
    const [trade] = await db.select().from(trades).where(eq(trades.id, id));
    return trade;
  }

  async getRecentTrades(limit: number = 50): Promise<Trade[]> {
    return await db
      .select()
      .from(trades)
      .orderBy(desc(trades.occurredAt))
      .limit(limit);
  }

  async getTradeStats(): Promise<{ wins: number; losses: number; total: number; winRate: number }> {
    const allTrades = await db.select().from(trades);
    const wins = allTrades.filter(t => t.result === 'win').length;
    const losses = allTrades.filter(t => t.result === 'loss').length;
    const total = allTrades.length;
    const winRate = total > 0 ? (wins / total) * 100 : 0;

    return {
      wins,
      losses,
      total,
      winRate: Math.round(winRate * 10) / 10,
    };
  }
}

export const storage = new DatabaseStorage();
