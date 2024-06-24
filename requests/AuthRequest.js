import { validateResult } from "../utils/validateResult.js"
import { REQUEST } from "./request.global.js"

export const AuthRequest = [
    REQUEST.email,
    REQUEST.password,
    (req, res, next) => {
        validateResult(req, res, next)
    }
]
