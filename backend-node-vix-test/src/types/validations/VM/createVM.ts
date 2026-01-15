import { z } from "zod";

const EVMStatus = z.enum(["RUNNING", "STOPPED", "PAUSED"]);
// Password validation regex
export const passwordRegex = {
  numbers: /(?=.*\d.*\d)/,
  lowercase: /(?=.*[a-z].*[a-z])/,
  uppercase: /(?=.*[A-Z].*[A-Z])/,
  special:
    /(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?].*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/,
};

export const vMCreatedSchema = z.object({
  vmName: z.string().optional(),
  vCPU: z.number().min(1, "vCPU must be at least 1"),
  ram: z.number().min(1, "RAM must be at least 1 GB"),
  disk: z.number().min(20, "Disk must be at least 20 GBs"),
  hasBackup: z.boolean().optional().default(false),
  pass: z.string().min(8, "Password must be at least 8 characters").optional(),
  location: z.string().optional(),
  idBrandMaster: z.number().nullable().optional(),
  status: EVMStatus.optional(),
  os: z.string().optional(),
});

export type TVMCreate = z.infer<typeof vMCreatedSchema>;
