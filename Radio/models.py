from django.core.validators import validate_image_file_extension
from django.db import models
from django.shortcuts import render
from django.utils import timezone
from django.utils.datetime_safe import datetime
from django.utils.html import format_html, format_html_join
from django.contrib.auth.models import User
from django.utils.safestring import mark_safe
from django.db.models.signals import post_save
from Mizikpam import settings
from Mizikpam.settings import STATIC_URL

image_upload_path = 'album_art/'


# Create your models here.


class Artist(models.Model):
    name = models.CharField(max_length=200)
    artist_img = models.ImageField(max_length=250, upload_to=image_upload_path,
                                   default=image_upload_path + "/MizikpamDefault.jpg",
                                   blank=True, validators=[validate_image_file_extension])
    about = models.CharField(max_length=1000)

    def __str__(self):
        return self.name


class Genre(models.Model):
    name = models.CharField(max_length=200)
    genre_img = models.ImageField(max_length=250, upload_to=image_upload_path,
                                  default=image_upload_path + "/MizikpamDefault.jpg",
                                  blank=True, validators=[validate_image_file_extension])

    def __str__(self):
        return self.name


class Song(models.Model):
    title = models.CharField(max_length=200)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, blank=True)
    album = models.CharField(max_length=200)
    composer = models.CharField(max_length=200)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE, blank=True)
    track_no = models.IntegerField(default=0)
    album_art = models.ImageField(max_length=250, upload_to=image_upload_path,
                                  default=image_upload_path + "/MizikpamDefault.jpg",
                                  blank=True, validators=[validate_image_file_extension])
    song = models.FileField(blank=True, upload_to=image_upload_path + "/songs")
    play_frequency = models.PositiveIntegerField(blank=True, default=0)
    likes = models.PositiveIntegerField(blank=True, default=0)
    release_date = models.DateField('release date', blank=True)

    def __str__(self):
        return self.get_song_title() + " by " + self.get_artist()

    def get_song_title(self):
        return self.title

    def get_artist(self):
        return self.artist.name

    def get_album(self):
        return self.album

    def get_album_art(self):
        return self.album_art

    def get_genre(self):
        return self.genre

    def get_composer(self):
        return self.composer

    def get_song(self):
        return self.song

    def preview_song(self):
        js = STATIC_URL + 'admin/js/jquery.adminpreview.js'
        css = STATIC_URL + 'admin/css/adminpreview.css'
        pass
        """
        return format_html('<script src="{}"></script> '
                           '<link href="{}" rel="stylesheet" type="text/x-scss" />'
                           '<tr>	'
                           '<td colspan="5">		'
                           '<table>'
                           '			<tr>'
                           '				<td>				'
                           '	                    <img src="{}" style="width: 150px; height: 150px">'
                           '				</td>	'
                           '	<td>		'
                           '<blockquote>'
                           '	          <span>Title: {} </span><br/>	'
                           '			  <span>Artist: {}</span><br/>'
                           '              <span>Album: {}</span><br/>'
                           '			  <span>Track No: {} </span>         '
                           '              <span>Genre: {} </span> <br/> '
                           '              <span>Composer: {} </span><br/>'
                           '              <span>Release Date: {} </span><br/>	'
                           '</blockquote>	'
                           '	<br/>      '
                           '            <audio controls  style="width: 200px;">       '
                           '                 <source src={} type="audio/mpeg">  '
                           '                      Your browser does not support the audio element.'
                           '            </audio>'
                           '</td>'
                           '</tr>'
                           '</table>'
                           '</td>'
                           '</tr>', js, css,
                           self.album_art.url, self.title, self.artist.name, self.album, self.track_no,
                           self.genre, self.composer, self.release_date,
                           self.song.url,
                           )
"""


class Playlist(models.Model):
    title = models.CharField(max_length=200)
    playlist_art = models.ImageField(max_length=250, upload_to=image_upload_path,
                                     default=image_upload_path + "/MizikpamDefault.jpg", blank=True,
                                     validators=[validate_image_file_extension])
    tracks = models.ManyToManyField(Song, blank=True)  # Many to Many Field with tracks
    created_at = models.DateField(auto_now_add=True, auto_now=False, null=True)
    updated_at = models.DateField(auto_now_add=False, auto_now=True, null=True)

    def __str__(self):
        return self.title

    def get_cookie_name(self):
        return 'Playlist %s' % self.pk

    class Meta:
        ordering = ('title',)
        verbose_name_plural = 'playlists'


class Mood(models.Model):
    title = models.CharField(max_length=200)
    mood_art = models.ImageField(max_length=250, upload_to=image_upload_path,
                                 default=image_upload_path + "/MizikpamDefault.jpg", blank=True,
                                 validators=[validate_image_file_extension])
    playlist = models.ManyToManyField(Playlist, blank=True)  # Many to Many Field with playlist
    created_at = models.DateField(auto_now_add=True, auto_now=False, null=True)
    updated_at = models.DateField(auto_now_add=False, auto_now=True, null=True)

    def __str__(self):
        return self.title

    def get_cookie_name(self):
        return 'Mood %s' % self.pk

    class Meta:
        ordering = ('title',)
        verbose_name_plural = 'moods'


class MusicVideo(models.Model):
    song = models.ForeignKey(Song, on_delete=models.CASCADE, blank=True)
    video_file = models.FileField(blank=True, upload_to=image_upload_path + "/video")
    url_link = models.URLField(blank=True)
    release_date = models.DateField('release date', blank=True)

    def __str__(self):
        return self.song.get_song_title() + " by " + self.song.get_artist()


class Browse(models.Model):
    name = models.CharField(max_length=200, default="Generic Browse")
    browse_art = models.ImageField(max_length=250, upload_to=image_upload_path,
                                   default=image_upload_path + "/MizikpamDefault.jpg", blank=True,
                                   validators=[validate_image_file_extension])
    playlist = models.ManyToManyField(Playlist, blank=True)  # Many to Many Field with playlist
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        # return format_html(' <span>Name: {} </span><br/>	'
        #                    '<img src="{}" style="width: 150px; height: 150px">',
        #                    self.name,
        #                    self.browse_art.url)
        return self.name

    class Meta:
        ordering = ('id',)
        verbose_name_plural = 'Browse'
        verbose_name = 'Browse'


# readonly models
class MostPlayedSongs(models.Model):
    track = models.ForeignKey(Song, blank=True, on_delete=models.CASCADE)  # Many to Many Field with tracks
    frequency = models.PositiveIntegerField(blank=True, default=0)

    def __str__(self):
        return str(self.frequency)

    class Meta:
        ordering = ('frequency',)


# readonly models
class RecentlyPlayedSongs(models.Model):
    track = models.ForeignKey(Song, blank=True, on_delete=models.CASCADE)  # Many to Many Field with tracks
    last_played = models.DateTimeField(blank=True, default=timezone.now)

    def __str__(self):
        return self.track.title

    class Meta:
        ordering = ('last_played',)


class Decade(models.Model):
    title = models.CharField(max_length=200)
    decades_art = models.ImageField(max_length=250, upload_to=image_upload_path,
                                    default=image_upload_path + "/MizikpamDefault.jpg",
                                    validators=[validate_image_file_extension],
                                    blank=True)
    tracks = models.ManyToManyField(Song, blank=True)  # Many to Many Field with tracks
    created_at = models.DateField(auto_now_add=True, auto_now=False, null=True)
    updated_at = models.DateField(auto_now_add=False, auto_now=True, null=True)

    def __str__(self):
        return self.title

    def get_cookie_name(self):
        return 'Decade %s' % self.pk

    class Meta:
        ordering = ('title',)
        verbose_name_plural = 'decades'


class UserProfileInfo(models.Model):
    user = models.OneToOneField(User, related_name='user', unique=True, on_delete=models.CASCADE)
    photo = models.ImageField(upload_to=image_upload_path + 'profile_pics', blank=True,
                              default=image_upload_path + 'profile_pics' + '/avatar.png')
    favourite_playlists = models.ManyToManyField(Playlist, blank=True,)
    favourite_artists = models.ManyToManyField(Artist, blank=True)
    recently_played = models.ForeignKey(Song, blank=True, on_delete=models.CASCADE, null=True )
    no_of_songs_played = models.PositiveIntegerField(blank=True, default=0)
    no_of_songs_favourited = models.PositiveIntegerField(blank=True, default=0)

    def __str__(self):
        return self.user.username

    @property
    def photo_url(self):
        if self.photo and hasattr(self.photo, 'url'):
            return self.photo.url

    def image_tag(self):
        print("photo link", self.photo.url)
        return format_html('<img src="{}" width="150" height="150" />', self.photo.url)

    image_tag.allow_tags = True
    image_tag.short_description = 'Profile Avatar'


def create_profile(sender, **kwargs):
    user = kwargs["instance"]
    if kwargs["created"]:
        user_profile_info = UserProfileInfo(user=user)
        user_profile_info.save()


post_save.connect(create_profile, sender=User)
