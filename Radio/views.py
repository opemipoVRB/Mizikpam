from datetime import datetime

from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Count
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.utils import timezone
from django.views import generic
from Radio.models import Song, Playlist, Mood, Browse, Artist, MostPlayedSongs, RecentlyPlayedSongs, Genre, UserProfileInfo


# Create your views here.


def index(request):
    time_now = str(datetime.now().strftime("%H:%M:%S"))
    # print(time_now)
    start_time_for_now = "16:00:00"
    _browse_ = Browse.objects.order_by('-start_time')
    # __browse = _browse_.playlists.values_list('pk', flat=True)
    browse_list = []
    _browse_now = []
    browse_playlist = []
    for _browse in _browse_:
        # print("Time now ", _browse.start_time, "Expect ", start_time_for_now)
        if str(_browse.start_time) == start_time_for_now:
            browse_id = _browse.id
            x_browse_ = get_object_or_404(Browse, id=browse_id)
            browse_playlists = x_browse_.playlist.values_list('pk', flat=True)
            for playlist_id in browse_playlists:
                _playlist_ = get_object_or_404(Playlist, id=playlist_id)
                # _playlist = _playlist_.tracks.values_list('pk', flat=True)
                browse_playlist.append(_playlist_)
            # print(browse_playlists)
            # print(browse_id)
            _browse_now.append(_browse)
        else:
            browse_list.append(_browse)

    del browse_playlist[0]
    most_played = []
    recently_played = []

    most_played_tracks = MostPlayedSongs.objects.order_by('frequency')

    for tracks in most_played_tracks:
        most_played.append(tracks)

    most_played_six = most_played[0:6]
    most_played_six = most_played_six[::-1]

    recently_played_tracks = RecentlyPlayedSongs.objects.order_by('last_played')

    for tracks in recently_played_tracks:
        recently_played.append(tracks)

    recently_played_six = recently_played[0:6]
    recently_played_six = recently_played_six[::-1]

    genres = Genre.objects.order_by('name')
    genre_song = []
    for songs in genres:
        genre_song.append(songs)

    moods = Mood.objects.order_by('title')
    mood_list = []
    slide_number = []
    slide_num = 0
    for mood in moods:
        mood_id = mood.id
        slide_num = slide_num + 1
        slide_number.append(slide_num)
        mood_list.append(mood)

    user = request.user

    username = get_object_or_404(User, id=user.id)

    user_profile = get_object_or_404(UserProfileInfo, user=user.id)

    context = {'browse_now': _browse_now, 'browse_list': browse_list, 'browse_id': browse_id,
               'browse': browse_playlist, 'most_played': most_played,
               'most_played_six': most_played_six, 'recently_played': recently_played,
               'recently_played_six': recently_played_six,
               'genres': genre_song, 'mood_id': mood_id, 'mood_list': mood_list,
               "slide_number": slide_number, 'username': username, "user_info": user_profile}

    print(context)
    return render(request, 'Radio/index.html', context=context)


def browse(request, browse_id):
    _browse_ = get_object_or_404(Browse, id=browse_id)
    _browse = _browse_.playlist.values_list('pk', flat=True)
    browse_playlist = []
    browse_tracks = []
    playlist_tracks = {}
    # print("I am ", _browse_)
    for playlist_id in _browse:
        # print("I am The Playlist ID", playlist_id)
        _playlist_ = get_object_or_404(Playlist, id=playlist_id)
        _playlist = _playlist_.tracks.values_list('pk', flat=True)
        browse_playlist.append(_playlist_)
        playlist_key = _playlist_
        _playlist_tracks = []

        # print("I am The Playlist in Browse", browse_playlist)
        for track_id in _playlist:  # list of track in playlist.tracks
            # print("I am Track ID", track_id)
            track = get_object_or_404(Song, id=track_id)
            browse_tracks.append(track)
            # print("Playlist name", playlist_key)
            _playlist_tracks.append(track)
            playlist_tracks[playlist_key] = _playlist_tracks

    # print("Playlist track", playlist_tracks)

    # print("Browse Tracks", browse_tracks)

    context = {'browse': _browse_, 'browse_playlist': browse_playlist, 'browse_tracks': browse_tracks,
               'playlist_tracks': playlist_tracks}
    return render(request, 'Radio/browse.html', context=context)


def playlist(request, playlist_id):
    _playlist_ = get_object_or_404(Playlist, id=playlist_id)
    _playlist = _playlist_.tracks.values_list('pk', flat=True)
    # this line counts the number of objects in a many-to-many field
    playlist_count = Playlist.objects.annotate(num_tracks=Count('tracks')).order_by('id')[playlist_id - 1].num_tracks

    tracks = []
    track_position = []
    positions = []
    slide_numbers = []
    for track_id in _playlist:  # list of track in playlist.tracks
        # print("This is the playlist size", playlist_count, "This is the track id", track_id)
        track_position.append(track_id)
        track = get_object_or_404(Song, id=track_id)
        tracks.append(track)
        # print("Postion size", track_position.__len__())
    for track_id in range(track_position.__len__()):
        if track_id == 1:
            slide_numbers.append(track_id)
            positions.append("first")
        elif track_id == track_position.__len__():
            slide_numbers.append(track_id)
            positions.append("last")
        else:
            slide_numbers.append(track_id)
            positions.append("")

    # print("tracks", tracks)
    context = {'playlist': _playlist_, 'tracks': tracks, 'position': positions, ' slide_number': slide_numbers}
    # print(context)
    return render(request, 'Radio/playlist.html', context=context)


def song(request, song_id):
    _song = get_object_or_404(Song, id=song_id)
    context = {'song': _song}
    return render(request, 'Radio/song.html', context=context)


def artist_profile(request, artist_id):
    artist = get_object_or_404(Artist, id=artist_id)
    context = {'artist': artist}
    return render(request, 'Radio/artist-profile.html', context=context)


def most_and_recently_played(request):
    most_played = MostPlayedSongs()
    recently_played = RecentlyPlayedSongs()
    time_now = timezone.now()
    print("This is the time now ", time_now)
    # datetime.now().strftime("%Y-%M-%d %H:%M:%S")
    print("Recieved request " + request.method)
    print("This is the time ", time_now)
    if request.method == 'POST' and request.is_ajax():
        if 'track' in request.POST:
            track = request.POST['track']
            # get strings before a flag
            track = track.split('uploads/')
            track = str(track[1])
            # check if track exist in record if it doesn't add it and add 1 to frequency
            # else if it exist get frequency and add 1 to it
            print("Last Played Track  ", track)
            print("Last Played Track 222 ", track)
            _song = get_object_or_404(Song, song=track)
            song_id = _song.id
            print("Found the song this is the ID ", song_id)
            try:
                most_played_tracks = MostPlayedSongs.objects.get(track=_song)
                track_frequency = most_played_tracks.frequency
                track_frequency = track_frequency + 1
                most_played_tracks.frequency = track_frequency
                most_played_tracks.save()
            except ObjectDoesNotExist:
                most_played.track = _song
                most_played.frequency = 1
                most_played.save()
            _song = get_object_or_404(Song, song=track)

            try:
                recently_played_tracks = RecentlyPlayedSongs.objects.get(track=_song)
                recently_played_tracks.last_played = time_now
                recently_played_tracks.save()
            except ObjectDoesNotExist:
                recently_played.track = _song
                recently_played.last_played = time_now
                recently_played.save()

        return HttpResponse('success')

    return HttpResponse('Failed to update stat')

    # return render(request, 'most_played.html')


def update_index_page(request):
    if request.method == 'GET':
        time_now = str(datetime.now().strftime("%H:%M:%S"))
        # print(time_now)
        start_time_for_now = "16:00:00"
        _browse_ = Browse.objects.order_by('-start_time')
        # __browse = _browse_.playlists.values_list('pk', flat=True)
        browse_list = []
        _browse_now = []
        browse_playlist = []
        for _browse in _browse_:
            # print("Time now ", _browse.start_time, "Expect ", start_time_for_now)
            if str(_browse.start_time) == start_time_for_now:
                browse_id = _browse.id
                x_browse_ = get_object_or_404(Browse, id=browse_id)
                browse_playlists = x_browse_.playlist.values_list('pk', flat=True)
                for playlist_id in browse_playlists:
                    _playlist_ = get_object_or_404(Playlist, id=playlist_id)
                    # _playlist = _playlist_.tracks.values_list('pk', flat=True)
                    browse_playlist.append(_playlist_)
                # print(browse_playlists)
                # print(browse_id)
                _browse_now.append(_browse)
            else:
                browse_list.append(_browse)

        del browse_playlist[0]
        most_played = []
        recently_played = []

        most_played_tracks = MostPlayedSongs.objects.order_by('frequency')

        for tracks in most_played_tracks:
            most_played.append(tracks)

        most_played_six = most_played[0:6]
        most_played_six = most_played_six[::-1]

        recently_played_tracks = RecentlyPlayedSongs.objects.order_by('last_played')

        for tracks in recently_played_tracks:
            recently_played.append(tracks)

        recently_played_six = recently_played[0:6]
        recently_played_six = recently_played_six[::-1]

        genres = Genre.objects.order_by('name')
        genre_song = []
        for songs in genres:
            genre_song.append(songs)

        moods = Mood.objects.order_by('title')
        mood_list = []
        slide_number = []
        slide_num = 0
        for mood in moods:
            mood_id = mood.id
            slide_num = slide_num + 1
            slide_number.append(slide_num)
            mood_list.append(mood)

        context = {'browse_now': _browse_now, 'browse_list': browse_list, 'browse_id': browse_id,
                   'browse': browse_playlist, 'most_played': most_played,
                   'most_played_six': most_played_six, 'recently_played': recently_played,
                   'recently_played_six': recently_played_six,
                   'genres': genre_song, 'mood_id': mood_id, 'mood_list': mood_list,
                   "slide_number": slide_number}
        print("Updating your new page", context)
        return render(request, 'Radio/update_music_stat.html', context)


def mizikpam_studio(request):
    context = {}
    return render(request, 'Radio/mizikpam_studio.html', context=context)


def mood(request, mood_id):
    _mood_ = get_object_or_404(Mood, id=mood_id)
    _mood = _mood_.playlist.values_list('pk', flat=True)
    mood_playlist = []
    mood_tracks = []
    playlist_tracks = {}
    # print("I am ", _mood_)
    for playlist_id in _mood:
        print("I am The Playlist ID", playlist_id)
        _playlist_ = get_object_or_404(Playlist, id=playlist_id)
        _playlist = _playlist_.tracks.values_list('pk', flat=True)
        mood_playlist.append(_playlist_)
        playlist_key = _playlist_
        _playlist_tracks = []

        # print("I am The Playlist in mood", mood_playlist)
        for track_id in _playlist:  # list of track in playlist.tracks
            # print("I am Track ID", track_id)
            track = get_object_or_404(Song, id=track_id)
            mood_tracks.append(track)
            # print("Playlist name", playlist_key)
            _playlist_tracks.append(track)
            playlist_tracks[playlist_key] = _playlist_tracks

    print("Playlist track", playlist_tracks)

    print("mood Tracks", mood_tracks)

    context = {'mood': _mood_, 'mood_playlist': mood_playlist, 'mood_tracks': mood_tracks,
               'playlist_tracks': playlist_tracks}
    return render(request, 'Radio/mood.html', context=context)


def profile(request, username):
    print(username)
    user = request.user
    username = get_object_or_404(User, username=username)
    print("Model ", username)
    print("User is", user)
    user_profile = get_object_or_404(UserProfileInfo, user=user.id)
    print("Model User Profile ", user_profile)
    favourite_playlist = user_profile.favourite_playlists.values_list('pk', flat=True)
    favourite_artist = user_profile.favourite_artists.values_list('pk', flat=True)
    _favourite_playlists = []
    _favourite_tracks = []
    _favourite_artists = []
    for playlist_id in favourite_playlist:
        _playlist_ = get_object_or_404(Playlist, id=playlist_id)
        _playlist = _playlist_.tracks.values_list('pk', flat=True)
        _favourite_playlists.append(_playlist_)
        playlist_key = _playlist_

        # print("I am The Playlist in mood", mood_playlist)
        for track_id in _playlist:  # list of track in playlist.tracks
            # print("I am Track ID", track_id)
            track = get_object_or_404(Song, id=track_id)
            _favourite_tracks.append(track)

    print("Playlist track", _favourite_tracks)

    for artist_id in favourite_artist:
        _artist_ = get_object_or_404(Artist, id=artist_id)
        _favourite_artists.append(_artist_)

        print("mood Tracks", _favourite_artists)

    context = {
        'username': username,
        'user': user,
        'user-profile': user_profile,
        'favourite_artists': _favourite_artists,
        'favourite_playlists': _favourite_playlists,
        'favorite_tracks': "",

    }
    print("See Something", context)
    return render(request, 'Radio/profile.html', context)
