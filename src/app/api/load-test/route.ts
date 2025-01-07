import { NextResponse } from 'next/server'

export async function GET() {
  const startTime = process.hrtime()
  
  await new Promise(resolve => setTimeout(resolve, 100))
  
  const diffTime = process.hrtime(startTime)
  const responseTime = (diffTime[0] * 1000 + diffTime[1] / 1000000).toFixed(2)
  
  return NextResponse.json({ 
    responseTime,
    timestamp: new Date().toISOString()
  })
}