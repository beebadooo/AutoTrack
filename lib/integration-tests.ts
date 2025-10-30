export interface TestResult {
  name: string
  status: "passed" | "failed"
  message: string
  duration: number
}

export async function runIntegrationTests(): Promise<TestResult[]> {
  const results: TestResult[] = []

  // Test 1: Blockchain Connection
  const blockchainStart = Date.now()
  try {
    const response = await fetch("/api/health")
    const data = await response.json()
    results.push({
      name: "Blockchain Connection",
      status: data.services.blockchain === "connected" ? "passed" : "failed",
      message: "Smart contracts deployed and accessible",
      duration: Date.now() - blockchainStart,
    })
  } catch (error) {
    results.push({
      name: "Blockchain Connection",
      status: "failed",
      message: String(error),
      duration: Date.now() - blockchainStart,
    })
  }

  // Test 2: Database Connection
  const dbStart = Date.now()
  try {
    const response = await fetch("/api/health")
    const data = await response.json()
    results.push({
      name: "Database Connection",
      status: data.services.database === "connected" ? "passed" : "failed",
      message: "Database connection established",
      duration: Date.now() - dbStart,
    })
  } catch (error) {
    results.push({
      name: "Database Connection",
      status: "failed",
      message: String(error),
      duration: Date.now() - dbStart,
    })
  }

  // Test 3: API Endpoints
  const apiStart = Date.now()
  try {
    const response = await fetch("/api/integration/test")
    const data = await response.json()
    results.push({
      name: "API Endpoints",
      status: data.allTestsPassed ? "passed" : "failed",
      message: "All API endpoints responding correctly",
      duration: Date.now() - apiStart,
    })
  } catch (error) {
    results.push({
      name: "API Endpoints",
      status: "failed",
      message: String(error),
      duration: Date.now() - apiStart,
    })
  }

  return results
}
