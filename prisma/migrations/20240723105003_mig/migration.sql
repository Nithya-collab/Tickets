-- CreateTable
CREATE TABLE "BookingDetails" (
    "bookingDetailId"   INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bookingId"         INTEGER NOT NULL,
    "ticketId"          INTEGER NOT NULL,
    "quantity"          INTEGER NOT NULL,
    "price"             DECIMAL,
    "createdAt"         DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"         DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "bookingdetails_ticket_id_fkey"  FOREIGN KEY ("ticketId")  REFERENCES "Tickets" ("ticketId") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "bookingdetails_booking_id_fkey" FOREIGN KEY ("bookingId") REFERENCES "Bookings" ("bookingId") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Bookings" (
    "bookingId"    INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId"       INTEGER NOT NULL,
    "eventId"      INTEGER NOT NULL,
    "bookingDate"  DATETIME DEFAULT CURRENT_TIMESTAMP,
    "totalAmount"  DECIMAL,
    "status"       TEXT,
    "createdAt"    DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"    DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "bookings_event_id_fkey" FOREIGN KEY ("eventId")  REFERENCES "Events" ("eventId") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "bookings_user_id_fkey"  FOREIGN KEY ("userId")   REFERENCES "Users" ("userId") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Categories" (
    "categoryId"    INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoryName"  TEXT NOT NULL,
    "description"   TEXT,
    "createdAt"     DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"     DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "EventCategories" (
    "eventCategoryId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "eventId"         INTEGER NOT NULL,
    "categoryId"      INTEGER NOT NULL,
    "createdAt"       DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"       DATETIME DEFAULT CURRENT_TIMESTAMP,
     CONSTRAINT "eventcategories_category_id_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories" ("categoryId") ON DELETE NO ACTION ON UPDATE NO ACTION,
     CONSTRAINT "eventcategories_event_id_fkey"    FOREIGN KEY ("eventId")    REFERENCES "Events" ("eventId") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Events" (
    "eventId"      INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "eventName"    TEXT NOT NULL,
    "description"  TEXT,
    "startTime"    DATETIME NOT NULL,
    "endTime"      DATETIME NOT NULL,
    "createdAt"    DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updateAt"     DATETIME DEFAULT CURRENT_TIMESTAMP,
    "organizerId"  INTEGER NOT NULL,
    "venueId"      INTEGER NOT NULL,
    CONSTRAINT "events_organizer_id_fkey" FOREIGN KEY ("organizerId") REFERENCES "Users" ("userId") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "events_venue_id_fkey"     FOREIGN KEY ("venueId")     REFERENCES "Venues" ("venueId") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Payments" (
    "paymentId"      INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bookingId"      INTEGER NOT NULL,
    "paymentDate"    DATETIME DEFAULT CURRENT_TIMESTAMP,
    "amount"         DECIMAL,
    "paymentMethod"  TEXT,
    "status"         TEXT,
    "createdAt"      DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"      DATETIME DEFAULT CURRENT_TIMESTAMP,
     CONSTRAINT "payments_booking_id_fkey" FOREIGN KEY ("bookingId") REFERENCES "Bookings" ("bookingId") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Scopes" (
    "scopeId"        INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "scopeName"      TEXT    NOT NULL,
    "description"    TEXT,
    "createdAt"      DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"      DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Tickets" (
    "ticketId"    INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "eventId"     INTEGER NOT NULL,
    "userId"      INTEGER,
    "categoryId"  INTEGER,
    "scopeId"     INTEGER,
    "status"      TEXT,
    "price"       DECIMAL,
    "createdAt"   DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"   DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "tickets_category_id_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories" ("categoryId") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "tickets_user_id_fkey"     FOREIGN KEY ("userId")     REFERENCES "Users"      ("userId") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "tickets_scope_id_fkey"    FOREIGN KEY ("scopeId")    REFERENCES "Scopes"     ("scopeId") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "tickets_event_id_fkey"    FOREIGN KEY ("eventId")    REFERENCES "Events"     ("eventId") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Users" (
    "userId"        INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userName"      TEXT     NOT NULL,
    "email"         TEXT     NOT NULL,
    "passwordHash"  TEXT     NOT NULL,
    "firstName"     TEXT,
    "lastName"      TEXT,
    "userType"      TEXT     NOT NULL,
    "createdAt"     DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"     DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Venues" (
    "venueId"      INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "venueName"    TEXT    NOT NULL,
    "address"      TEXT    NOT NULL,
    "city"         TEXT    NOT NULL,
    "state"        TEXT,
    "zipCode"      TEXT,
    "country"      TEXT    NOT NULL,
    "capacity"     INTEGER,
    "description"  TEXT,
    "createdAt"    DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"    DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_events_1" ON "events"("organizer_id");
Pragma writable_schema=0;
