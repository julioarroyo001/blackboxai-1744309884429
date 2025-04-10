// Middleware to handle errors globally
export const errorMiddleware = store => next => action => {
  // Check if the action has an error property
  if (action.error) {
    console.error('Error in action:', action.error);
    
    // You could dispatch a notification action here
    store.dispatch({
      type: 'app/setNotification',
      payload: {
        type: 'error',
        message: action.error.message || 'Ha ocurrido un error'
      }
    });
  }
  
  return next(action);
};
