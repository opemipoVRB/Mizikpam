from django.contrib import admin
from django.contrib.admin.widgets import AdminFileWidget
from django.contrib.auth.models import Group, User
from django.utils.safestring import mark_safe
from easy_thumbnails.files import get_thumbnailer
from sorl.thumbnail import get_thumbnail
from .models import Song, Playlist, Mood, MusicVideo, Browse, Decade, Artist, Genre, UserProfileInfo
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


# Register your models here.

class SongAdminAlbumArtWidget(AdminFileWidget):
    def render(self, name, value, attrs=None):
        output = []
        if value and getattr(value, "url", None):
            t = get_thumbnail(value, '150x150')
            output.append('<img src="{}">'.format(t.url))
        output.append(super(AdminFileWidget, self).render(name, value, attrs))
        return mark_safe(u''.join(output))


class SongAdmin(admin.ModelAdmin):
    list_display = ('title', 'preview_song')

    def formfield_for_dbfield(self, db_field, **kwargs):
        if db_field.name == 'album_art':
            request = kwargs.pop("request", None)
            kwargs['widget'] = SongAdminAlbumArtWidget
            return db_field.formfield(**kwargs)
        return super(SongAdmin, self).formfield_for_dbfield(db_field, **kwargs)


class PlaylistAdmin(admin.ModelAdmin):
    filter_horizontal = ('tracks',)

    def formfield_for_dbfield(self, db_field, **kwargs):
        if db_field.name == 'playlist_art':
            request = kwargs.pop("request", None)
            kwargs['widget'] = SongAdminAlbumArtWidget
            return db_field.formfield(**kwargs)
        return super(PlaylistAdmin, self).formfield_for_dbfield(db_field, **kwargs)


class BrowseAdmin(admin.ModelAdmin):
    filter_vertical = ('playlist',)

    def formfield_for_dbfield(self, db_field, **kwargs):
        if db_field.name == 'browse_art':
            request = kwargs.pop("request", None)
            kwargs['widget'] = SongAdminAlbumArtWidget
            return db_field.formfield(**kwargs)
        return super(BrowseAdmin, self).formfield_for_dbfield(db_field, **kwargs)


class MoodAdmin(admin.ModelAdmin):
    filter_vertical = ('playlist',)

    def formfield_for_dbfield(self, db_field, **kwargs):
        if db_field.name == 'mood_art':
            request = kwargs.pop("request", None)
            kwargs['widget'] = SongAdminAlbumArtWidget
            return db_field.formfield(**kwargs)
        return super(MoodAdmin, self).formfield_for_dbfield(db_field, **kwargs)


class ArtistAdmin(admin.ModelAdmin):
    def formfield_for_dbfield(self, db_field, **kwargs):
        if db_field.name == 'artist_img':
            request = kwargs.pop("request", None)
            kwargs['widget'] = SongAdminAlbumArtWidget
            return db_field.formfield(**kwargs)
        return super(ArtistAdmin, self).formfield_for_dbfield(db_field, **kwargs)


class GenreAdmin(admin.ModelAdmin):
    def formfield_for_dbfield(self, db_field, **kwargs):
        if db_field.name == 'genre_img':
            request = kwargs.pop("request", None)
            kwargs['widget'] = SongAdminAlbumArtWidget
            return db_field.formfield(**kwargs)
        return super(GenreAdmin, self).formfield_for_dbfield(db_field, **kwargs)


class UserProfileInfoInline(admin.StackedInline):
    model = UserProfileInfo
    verbose_name = 'Additional User Details'

    fields = ['user', ('image_tag',), 'favourite_playlists', 'favourite_artists', 'recently_played',
              'no_of_songs_played',
              'no_of_songs_favourited']
    filter_horizontal = ('favourite_playlists', 'favourite_artists')
    can_delete = False
    readonly_fields = ('image_tag', 'favourite_playlists', 'favourite_artists', 'recently_played', 'no_of_songs_played',
                       'no_of_songs_favourited')
    # readonly_fields = ('image_tag',)


class UserAdmin(BaseUserAdmin):
    inlines = (UserProfileInfoInline,)


admin.site.unregister(User)
admin.site.register(User, UserAdmin)
admin.site.register(Artist, ArtistAdmin)
admin.site.register(Genre, GenreAdmin)
admin.site.register(Playlist, PlaylistAdmin)
admin.site.register(Decade, PlaylistAdmin)
admin.site.register(Mood, MoodAdmin)
admin.site.register(MusicVideo)
admin.site.register(Browse, BrowseAdmin)
admin.site.unregister(Group)
admin.site.register(Song, SongAdmin)
