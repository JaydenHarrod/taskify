-- CreateTable
CREATE TABLE "OrgSubscription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orgId" TEXT NOT NULL,
    "stripe_customer_id" TEXT,
    "stripe_subscription_id" TEXT,
    "stripe_price_id" TEXT,
    "stripe_current_period_end" DATETIME
);

-- CreateIndex
CREATE UNIQUE INDEX "OrgSubscription_orgId_key" ON "OrgSubscription"("orgId");

-- CreateIndex
CREATE UNIQUE INDEX "OrgSubscription_stripe_customer_id_key" ON "OrgSubscription"("stripe_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "OrgSubscription_stripe_subscription_id_key" ON "OrgSubscription"("stripe_subscription_id");
