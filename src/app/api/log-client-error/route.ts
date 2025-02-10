import { NextRequest, NextResponse } from 'next/server';
import { appendFile, mkdir } from 'fs/promises';
import { resolve } from 'path';

export async function POST(req: NextRequest) {
    try {
        const errorLog = await req.json();
        const logDir = resolve(process.cwd(), './logs');
        const logFilePath = resolve(logDir, 'client-errors.log');

        // Ensure the logs directory exists
        await mkdir(logDir, { recursive: true });

        // Format log entry
        const logEntry = `[${new Date().toISOString()}] ${JSON.stringify(errorLog)}\n`;

        // Write to a log file
        await appendFile(logFilePath, logEntry);

        console.log('Client error logged:', logEntry);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error logging client error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to log error' },
            { status: 500 }
        );
    }
}
