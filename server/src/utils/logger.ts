const logger = {
    error: (log: string) => {
        console.log('❌\x1b[31m%s\x1b[0m', log)
    },
    info: (log: string) => {
        console.log('⚠️\x1b[37m%s\x1b[0m', log)
    },
    warn: (log: string) => {
        console.log('ℹ️\x1b[33m%s\x1b[0m', log)
    },
    success: (log: string) => {
        console.log('✅\x1b[32m%s\x1b[0m', log)
    }
}

export default logger;