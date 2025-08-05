from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response

class CustomGoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        user = self.user
        if user and user.is_authenticated:
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            })
        return response 