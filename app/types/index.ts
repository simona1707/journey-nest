import { Listing, Reservation, User } from "@prisma/client";


export type SafeListings = Omit<Listing, "createdAt"> & {
  createdAt: string;
  id: string;
};

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};