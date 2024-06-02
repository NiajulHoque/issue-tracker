import { UserAccount } from "@repo/data-commons";

export type FindByEmail = (email: string) => Promise<UserAccount | null>;
