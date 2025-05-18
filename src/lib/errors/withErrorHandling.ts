import { NextRequest, NextResponse } from 'next/server'
import { ApiError } from './ApiError'

export function withErrorHandling(routeHandler: (req: NextRequest) => Promise<unknown>) {
  return async function (req: NextRequest) {
    try {
      const payload = await routeHandler(req)
      return NextResponse.json(payload)
    } catch (err: unknown) {
      // re-throw on dynamic server bailout to escape try-catch when getting request params
      // TODO: restructure so error handler is called after get params
      if (err instanceof Error && err.message.startsWith('Dynamic server usage:')) {
        throw err
      }

      console.error('Unhandled error:', err)
      if (err instanceof ApiError) {
        return NextResponse.json({ error: err.message }, { status: err.status })
      }
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
  }
}
