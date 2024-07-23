from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from SocialApp import admin

router = DefaultRouter()
router.register('posts', views.PostViewSet)
router.register('users', views.UserViewSet)
router.register('imagePosts', views.ImagePostViewSet)
router.register('FriendShips', views.FriendShipViewSet)
router.register('comments', views.CommentViewSet)
router.register('likes', views.LikeViewSet)
router.register('sharePosts', views.SharePostViewSet)
router.register('Notifications', views.NotificationViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('friendship/get_friendship/', views.FriendShipViewSet.as_view({'get': 'get_friendship'}), name='get_friendship'),
    path('admin/stats-revenue/', admin.SocialAppAdminSite.stats, name='admin_stats_revenue'),
]
