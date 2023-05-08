-- CreateTable
CREATE TABLE "GroceryList" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "purchased" BOOLEAN DEFAULT false,
    "groceryListId" INTEGER NOT NULL,
    CONSTRAINT "Item_groceryListId_fkey" FOREIGN KEY ("groceryListId") REFERENCES "GroceryList" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
