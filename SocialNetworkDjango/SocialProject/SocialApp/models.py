from django.db import models
from django.contrib.auth.models import AbstractUser
from ckeditor.fields import RichTextField
from cloudinary.models import CloudinaryField



class ItemBase(models.Model):
    # Meta options này sẽ biến class này thành 1 class trừu tượng
    # khi tạo csdl nó sẽ không tạo class này thành 1 table
    class Meta:
        abstract = True
        ordering = ['-id'] 

    content = models.TextField(null=False, blank=True) #Được để trống
    created_date = models.DateTimeField(auto_now_add=True)  # auto_now_add=True - Chỉ tạo khi Course được tạo
    update_date = models.DateTimeField(auto_now=True)  # auto_now=True - Cứ cập nhật Course thì update_date cũng update
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.subject


class User(AbstractUser):
    avatar = CloudinaryField('avatar', null=True)
    # avatar = models.ImageField(upload_to='uploads/%Y/%m', null = True)
    avatarCover = models.ImageField(upload_to='uploads/%Y/%m')
    userRole = models.CharField(max_length=15, null=False)


class Post(ItemBase):
    # title = models.CharField(max_length=255, null=True, unique=True) #unique=True: không trùng nhau
    
    # on_delete = models.CASCADE - Khi xóa Category thì Course cũng bị xóa theo
    # on_delete = models.PROTECT - Khi Category đã có Course thì không cho xóa
    # on_delete = models.SET_DEFAULT - Khi Category bị xóa thì cái Course bị set về Category mặc định
    # on_delete = models.SET_NULL - Khi Category bị xóa thì cái Course bị set thành NULL
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)  # Set khóa ngoại

    def __str__(self):
        return self.content #Hiện content


class ImagesPost(models.Model): 
    # title = models.CharField(max_length=255, null=True, unique=True)
    # image = models.ImageField(upload_to='posts/%Y/%m', null=True)
    image = CloudinaryField('image', null=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=False)


class Interaction(ItemBase):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=False)

    class Meta:
        abstract = True


class Comment(Interaction):
    # image = models.ImageField(upload_to='comments/%Y/%m', null=True)

    def __str__(self):
        return self.content #Hiện content


class FriendShip(models.Model): 
    user_one = models.ForeignKey(User, on_delete=models.CASCADE, related_name="friendship_user_one", null=False)
    user_two = models.ForeignKey(User, on_delete=models.CASCADE, related_name="friendship_user_two", null=False)
    status = models.CharField(max_length=3, null=False)
    created_date = models.DateTimeField(auto_now_add=True) 
    update_date = models.DateTimeField(auto_now=True)


class Like(models.Model):
    created_date = models.DateTimeField(auto_now_add=True) 
    update_date = models.DateTimeField(auto_now=True) 
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=False)

    class Meta:
        unique_together = ('user', 'post')


class SharePost(models.Model): 
    created_date = models.DateTimeField(auto_now_add=True) 
    update_date = models.DateTimeField(auto_now=True) 
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=False)

    class Meta:
        ordering = ['-created_date']  # Sắp xếp giảm dần theo thời gian tạo


class Notification(ItemBase):
    typeNoti = models.CharField(max_length=3, null=False)
    userMake = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_make", null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user", null=False)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.content  # Hiện content
