import { SupportedLanguage } from '../common/supported-languages'

export const EngineMessages = {
    [SupportedLanguage.ARABIC]: {
        step_failed: "فشلت الخطوة: {{stepName}}",
        execution_completed: "تم تنفيذ التدفق بنجاح",
        invalid_variable: "المتغير {{variable}} غير موجود",
        connection_error: "خطأ في الاتصال بالسيرفر"
    },
    [SupportedLanguage.ENGLISH]: {
        step_failed: "Step failed: {{stepName}}",
        execution_completed: "Flow executed successfully",
        invalid_variable: "Variable {{variable}} not found",
        connection_error: "Connection error with server"
    },
    [SupportedLanguage.RUSSIAN]: {
        step_failed: "Ошибка шага: {{stepName}}",
        execution_completed: "Поток успешно выполнен",
        invalid_variable: "Переменная {{variable}} не найдена",
        connection_error: "Ошибка соединения с сервером"
    },
    [SupportedLanguage.CHINESE]: {
        step_failed: "步骤失败: {{stepName}}",
        execution_completed: "流程执行成功",
        invalid_variable: "变量 {{variable}} 未找到",
        connection_error: "与服务器连接错误"
    }
}
