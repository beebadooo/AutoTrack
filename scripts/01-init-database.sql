-- NanoSeconds Database Schema
-- Initialize all tables for the car lifecycle management platform

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255),
  role VARCHAR(50) NOT NULL CHECK (role IN ('customer', 'manufacturer', 'dealer', 'insurance', 'service', 'rto')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);

-- Vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vin VARCHAR(17) UNIQUE NOT NULL,
  make VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  year INTEGER NOT NULL,
  color VARCHAR(50),
  engine_number VARCHAR(100),
  chassis_number VARCHAR(100),
  manufacturer_wallet VARCHAR(255) NOT NULL,
  current_owner_wallet VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'manufactured' CHECK (status IN ('manufactured', 'in_transit', 'sold', 'in_service', 'retired')),
  blockchain_hash VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Vehicle Records table (damage, service, inspections, etc.)
CREATE TABLE IF NOT EXISTS vehicle_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  record_type VARCHAR(50) NOT NULL CHECK (record_type IN ('damage', 'service', 'ownership_transfer', 'inspection', 'insurance_claim', 'quality_check')),
  recorded_by VARCHAR(255) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  description TEXT,
  details JSONB DEFAULT '{}'::jsonb,
  blockchain_hash VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ownership History table
CREATE TABLE IF NOT EXISTS ownership_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  previous_owner VARCHAR(255),
  new_owner VARCHAR(255) NOT NULL,
  transfer_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  transfer_type VARCHAR(50) CHECK (transfer_type IN ('factory_to_dealer', 'dealer_to_customer', 'customer_to_customer', 'service_center', 'insurance_claim')),
  blockchain_hash VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Service Records table
CREATE TABLE IF NOT EXISTS service_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  service_provider_wallet VARCHAR(255) NOT NULL,
  service_type VARCHAR(100) NOT NULL,
  service_date TIMESTAMP NOT NULL,
  description TEXT,
  cost DECIMAL(10, 2),
  parts_replaced JSONB DEFAULT '[]'::jsonb,
  next_service_due TIMESTAMP,
  blockchain_hash VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insurance Claims table
CREATE TABLE IF NOT EXISTS insurance_claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  insurance_company_wallet VARCHAR(255) NOT NULL,
  claim_number VARCHAR(100) UNIQUE NOT NULL,
  claim_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  claim_type VARCHAR(50) NOT NULL CHECK (claim_type IN ('accident', 'theft', 'damage', 'total_loss')),
  claim_amount DECIMAL(12, 2),
  claim_status VARCHAR(50) DEFAULT 'pending' CHECK (claim_status IN ('pending', 'approved', 'rejected', 'settled')),
  description TEXT,
  supporting_documents JSONB DEFAULT '[]'::jsonb,
  blockchain_hash VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Damage Records table
CREATE TABLE IF NOT EXISTS damage_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  recorded_by VARCHAR(255) NOT NULL,
  damage_type VARCHAR(100) NOT NULL,
  severity VARCHAR(20) CHECK (severity IN ('minor', 'moderate', 'severe')),
  location VARCHAR(255),
  description TEXT,
  repair_cost DECIMAL(10, 2),
  repair_status VARCHAR(50) DEFAULT 'pending' CHECK (repair_status IN ('pending', 'in_progress', 'completed')),
  images JSONB DEFAULT '[]'::jsonb,
  blockchain_hash VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quality Checks table (for manufacturer quality assurance)
CREATE TABLE IF NOT EXISTS quality_checks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  inspector_wallet VARCHAR(255) NOT NULL,
  check_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  check_type VARCHAR(100) NOT NULL,
  status VARCHAR(50) NOT NULL CHECK (status IN ('passed', 'failed', 'conditional')),
  issues JSONB DEFAULT '[]'::jsonb,
  notes TEXT,
  blockchain_hash VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sessions table (for authentication)
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_vehicles_vin ON vehicles(vin);
CREATE INDEX idx_vehicles_manufacturer ON vehicles(manufacturer_wallet);
CREATE INDEX idx_vehicles_owner ON vehicles(current_owner_wallet);
CREATE INDEX idx_vehicle_records_vehicle_id ON vehicle_records(vehicle_id);
CREATE INDEX idx_vehicle_records_type ON vehicle_records(record_type);
CREATE INDEX idx_ownership_history_vehicle_id ON ownership_history(vehicle_id);
CREATE INDEX idx_service_records_vehicle_id ON service_records(vehicle_id);
CREATE INDEX idx_insurance_claims_vehicle_id ON insurance_claims(vehicle_id);
CREATE INDEX idx_damage_records_vehicle_id ON damage_records(vehicle_id);
CREATE INDEX idx_quality_checks_vehicle_id ON quality_checks(vehicle_id);
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_token ON sessions(token);
CREATE INDEX idx_users_wallet ON users(wallet_address);
