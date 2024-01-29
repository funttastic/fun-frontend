export const mainMiddleware = store => next => action => {
	return next(action)
}
