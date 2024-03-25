import { auth, currentUser } from "@clerk/nextjs";
import { db } from "./db";

type EntityType = "BOARD" | "LIST" | "CARD";
type Action = "CREATE" | "UPDATE" | "DELETE";

interface Props {
  entityId: string;
  entityTitle: string;
  entityType: EntityType;
  action: Action;
}

export const createAuditLog = async ({
  entityId,
  entityTitle,
  entityType,
  action,
}: Props) => {
  try {
    const { orgId } = auth();
    const user = await currentUser();

    if (!orgId || !user) {
      throw new Error("User not found!");
    }

    await db.auditLog.create({
      data: {
        orgId,
        userId: user?.id,
        userImage: user?.imageUrl,
        userName: user?.firstName + " " + user?.lastName,
        entityId,
        entityTitle,
        entityType,
        action,
      },
    });
  } catch (error) {
    console.log("[AUDIT_LOG_ERROR]", error);
  }
};
