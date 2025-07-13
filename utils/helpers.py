# Helper functions

def format_response(data, message="Success", status_code=200):
    """
    Format API response
    """
    return {
        'status_code': status_code,
        'message': message,
        'data': data
    }