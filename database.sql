CREATE TABLE turfs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    cricket BOOLEAN DEFAULT FALSE, -- Whether the turf supports cricket
    football BOOLEAN DEFAULT FALSE, -- Whether the turf supports football
    badminton BOOLEAN DEFAULT FALSE, -- Whether the turf supports badminton
    area VARCHAR(100) NOT NULL,
    detailed_info TEXT, -- Additional information about the turf
    imageURL VARCHAR(255), -- URL of the turf image
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE userprofile (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    FullName VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    DateOfBirth DATE NOT NULL,
    Gender ENUM('Male', 'Female', 'Other') NOT NULL
);

CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    date DATE NOT NULL,  -- The booking date
    time_slot INT NOT NULL,  -- The time slot (e.g., 6, 7, 8 for hours)
    paymentProof VARCHAR(255),  -- File name or path for payment proof
    numberOfPeople INT NOT NULL,
    turf_id INT NOT NULL,  -- Foreign key to the turf being booked
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (turf_id) REFERENCES turfs(id)
);





CREATE TABLE turfavailability (
    id INT AUTO_INCREMENT PRIMARY KEY,
    turf_id INT NOT NULL,
    date DATE NOT NULL,
    time_slot VARCHAR(50) NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_turf_availability
        FOREIGN KEY (turf_id)
        REFERENCES turfs(id)
        ON DELETE CASCADE,
    UNIQUE (turf_id, date, time_slot) -- Ensures no duplicate availability records for the same slot
);
