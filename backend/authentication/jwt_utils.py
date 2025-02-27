from datetime import datetime, timedelta
import jwt
from django.conf import settings
from django.contrib.auth.models import User


def generate_jwt_token(user):
    payload = {
        'user_id': user.get('email'),
        'exp': datetime.utcnow() + timedelta(days=7),
    }

    token = jwt.encode(payload, 'omarhazem', algorithm='HS256')
    return token


def decode_jwt_token(token):
    try:
        payload = jwt.decode(token, 'omarhazem', algorithms=['HS256'])
        user_id = payload['user_id']
        return user_id
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None


def get_token_from_request(request):
    authorization_header = request.headers.get('Authorization')
    if authorization_header and authorization_header.startswith('Bearer '):
        # Extract the token after 'Bearer '
        token = authorization_header.split(' ')[1]
        return token
    return None
