from django.contrib import admin
from django.urls import path
from django.template.response import TemplateResponse
from django.db.models import Sum, F, Q, Count
from django.db.models.functions import ExtractYear, ExtractMonth, ExtractQuarter

from .models import User, Post, Comment, ImagesPost, FriendShip, Like, SharePost, Notification
from django.utils.html import mark_safe


class SocialAppAdminSite(admin.AdminSite):
    site_header = "Admin manage"
    index_template = 'admin2/admin_home.html'

    class Media:
        css = {
            'all': ('/static/css/style.css',)
        }

    js = ('/static/js/script.js',)

    def get_urls(self):
        return [
                   path('stats-revenue/', self.stats),
               ] + super().get_urls()

    def stats(request):
        stats_count_user = (
            User.objects
            .annotate(month=ExtractMonth('date_joined'))
            .values('month')
            .annotate(count=Count('id'))
            .order_by('month')
        )

        month = request.GET.get('month')
        year = request.GET.get('year')
        quarter = request.GET.get('quarter')

        result = (
            Post.objects
            .annotate(month=ExtractMonth('created_date'))
            .values('month')
            .annotate(count=Count('id'))
            .order_by('month')
        )

        if year:
            if quarter and month:
                result = result.filter(
                    Q(created_date__quarter=quarter, created_date__year=year) |
                    Q(month=month, created_date__year=year)
                )
                stats_count_user = stats_count_user.filter(
                    Q(date_joined__quarter=quarter, date_joined__year=year) |
                    Q(month=month, date_joined__year=year)
                )
            elif month:
                result = result.filter(month=month, created_date__year=year)
                stats_count_user = stats_count_user.filter(month=month, date_joined__year=year)
            elif quarter:
                result = result.filter(created_date__quarter=quarter, created_date__year=year)
                stats_count_user = stats_count_user.filter(date_joined__quarter=quarter, date_joined__year=year)
            else:
                result = result.filter(created_date__year=year)
                stats_count_user = stats_count_user.filter(date_joined__year=year)
        elif quarter:
            result = result.filter(created_date__quarter=quarter)
            stats_count_user = stats_count_user.filter(date_joined__quarter=quarter)
        elif month:
            result = result.filter(month=month)
            stats_count_user = stats_count_user.filter(month=month)

        return TemplateResponse(request, 'admin/stats.html', {
            'stats_count_user': stats_count_user,
            'stats_revenue': result,
        })


class PostAdmin(admin.ModelAdmin):
    list_display = ["content", "created_date"]
    search_fields = ["content"]
    list_filter = ["content"]


class UseAdmin(admin.ModelAdmin):
    list_display = ["username", "email"]
    readonly_fields = ["img", "imgcover"]

    def img(self, user):
        if user.avatar:
            image_url = user.avatar.url
            return mark_safe(
                '<img src="{url}"  width="120"/>'.format(url=image_url)
            )
        else:
            return '-'

    def imgcover(self, user):
        if user:
            return mark_safe(
                '<img src="/static/{url}"  width="120"/>'.format(url=user.avatarCover.name)
            )

    def stats(request):
        stats_count_user = User.objects.count()

        return TemplateResponse(request, 'admin/stats.html', {
            'stats_count_user': stats_count_user,
        })


class ImagePostAdmin(admin.ModelAdmin):
    list_display = ["image"]
    readonly_fields = ["img"]

    def img(self, imagepost):
        if imagepost.image:
            image_url = imagepost.image.url
            return mark_safe(
                '<img src="{url}"  width="120"/>'.format(url=image_url)
            )
        else:
            return '-'

admin_site = SocialAppAdminSite(name='socialappadmin')

# Register your models here.
admin_site.register(User, UseAdmin)
admin_site.register(Post, PostAdmin)
admin_site.register(Comment)
admin_site.register(ImagesPost, ImagePostAdmin)
admin_site.register(FriendShip)
admin_site.register(Like)
admin_site.register(SharePost)
admin_site.register(Notification)

admin.site = admin_site
