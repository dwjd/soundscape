soundscape = {};

soundscape.api = {};
soundscape.api.server = 'http://10.11.46.210:3000';
soundscape.log = function(item){
	console.log(item);
}

// url
// /song/*code*
// /tag/*user*/*venue*/*song*
// /user/*name*/*email*/*phone*
// /user/*email*
// /user/*email*/tags
// /venue/*venue*/tags


// /venue/*venue*

// get nearby venues
// /venue/*nearby*or*trending*/*lat*,*lon*

soundscape.disrupt_geo = '40.7264673,-73.9751012';

soundscape.billie = 'eJxVlIuNwzAMQ1fxCDL133-xo1rnGqNAEcWy_ERa2aKeZmW9ustWVYrXrl5bthn_laFkzguNWpklEmoTB74JKYZSPlbJ0sy9fQrsrbEaO9W3bsbaWOoK7IhkHFaf_ag2d75oOQSZczbz5CKA7XgTIBIXASvFi0A3W8pMUZ7FZTWTVbujCcADlQ_f_WbdRNJ2vDUwSF0EZmFvAku_CVy440fgiIvArWZZWoJ7GWd-CVTYC5FCFI8GQdECdROE20UQfLoIUmhLC7IiByF1gzbAs3tsSKctyC76MPJlHRsZ5qhSQhu_CJFcKtW4EMrHSIrpTGLFqsdItj1H9JYHQYN7W2nkC6GDPjZTAzL9dx0fS4M1FoROHh9YhLHWdRchQSd_CLTpOHkQQP3xQsA2-sLOUD7CzxU0GmHVdIxh46Oide0NrNEmjghG44Ax_k2AoDHsiV6WsiD6OFm8y-0Lyt8haDBBzeMlAnTuuGYIB4WA2lEPAWbdeOabgFN6TQMs6ctLA5fHyKMBB0veGrjPfP00IAlWNm9n7hEh5PiYYBGKQDP-x4F0CL8HkhoQnRWN997JyEpnHFR7EhLPQMZmgXS68hsHktEVErranvSSR2VwfJhQCnkuwhBUcINNY-xu1pmw3PmBqU9-8xu0kiF1ngOa8vwBSSzzNw\=\=';

soundscape.api.get_song = function(code,callback){
	var url = soundscape.api.server + '/song/' + code;
	var query = {
		url:url,
		dataType:'json',
		success: function(result){
			callback(result);
		}
	}
	jQuery.ajax(query);
}
soundscape.api.get_venues = function(nearortrend, geo, callback){
	var url = soundscape.api.server + '/venue/' + nearortrend + '/' + geo;
	var query = {
		url:url,
		dataType:'json',
		success: function(result){
			callback(result);
		}
	}
	jQuery.ajax(query);
}
soundscape.api.venue_get_info = function(venue_id, callback){
	var url = soundscape.api.server + '/venue/' + venue_id;
	var query = {
		url:url,
		dataType:'json',
		success: function(result){
			callback(result);
		}
	}
	jQuery.ajax(query);
}
soundscape.api.venue_get_tags = function(venue_id, callback){
	var url = soundscape.api.server + '/venue/' + venue_id + '/tags';
	var query = {
		url:url,
		dataType:'json',
		success: function(result){
			callback(result);
		}
	}
	jQuery.ajax(query);
}
soundscape.api.user_add = function(user_email,name,phone, callback){
	var url = soundscape.api.server + '/user/' + user_email + '/' + name + '/' + phone;
	var query = {
		url:url,
		dataType:'json',
		success: function(result){
			callback(result);
		}
	}
	jQuery.ajax(query);
}

soundscape.api.user_get_info = function(user_email, callback){
	var url = soundscape.api.server + '/user/' + user_email;
	var query = {
		url:url,
		dataType:'json',
		success: function(result){
			callback(result);
		}
	}
	jQuery.ajax(query);
}
soundscape.api.user_get_tags = function(user_email, callback){
	var url = soundscape.api.server + '/user/' + user_email + '/tags';
	var query = {
		url:url,
		dataType:'json',
		success: function(result){
			callback(result);
		}
	}
	jQuery.ajax(query);
}
soundscape.api.tag_song = function(user_email,like,song,venue,callback){
	var url = soundscape.api.server + '/tag/' + user_email + '/' + like + '/' + song + '/' + venue;
	var query = {
		url:url,
		dataType:'json',
		success: function(result){
			callback(result);
		}
	}
	jQuery.ajax(query);
}



soundscape.show = {};

soundscape.show.nearby_venues = function(geo){
	$('#tag_song').hide();
	$('#venues_list').show();

	$('#subheading').attr('class','').addClass('search_venue_nearby');
	
	var add_venues = function(venues){
		$('#venues_list ul').empty().append('<li class="loading">Loading Venues ...</li>');
		var html = ''
		$(venues).each(function(i,v){
			html += '<li data-venue-id="' + v._id + '"><span class="venue_name">' + v.name + '</span><br/><span class="venue_address">' + v.category + '</span> <span class="venue_distance">(' + v.distance + 'm)</span></li>';
			$('#venues_list ul').empty().append(html);
		})
	}
	geo = geo || soundscape.disrupt_geo;
	soundscape.api.get_venues('nearby', geo, add_venues);
}
soundscape.show.trending_venues = function(geo){
	$('#tag_song').hide();
	$('#venues_list').show();
	$('#subheading').attr('class','').addClass('search_venue_best_match');
	var add_venues = function(venues){
		$('#venues_list ul').empty().append('<li class="loading">Loading Venues ...</li>');
		var html = ''
		$(venues).each(function(i,v){
			html += '<li data-venue-id="' + v._id + '"><span class="venue_name">' + v.name + '</span><br/><span class="venue_address">' + v.category + '</span> <span class="venue_distance">(' + v.distance + 'm)</span></li>';
			$('#venues_list ul').empty().append(html);
		})
	}
	geo = geo || soundscape.disrupt_geo;
	soundscape.api.get_venues('trending', geo, add_venues);
}

soundscape.show.thumbs_up = function(){
	$('#subheading').attr('class','').addClass('tag_song');
	$('#tag_song').attr('class','').addClass('thumbs_up');
	$('#venues_list').hide()
	$('#tag_song').show()
	var t = setTimeout('soundscape.show.song()',800);
}
soundscape.show.thumbs_down = function(){
	$('#subheading').attr('class','').addClass('tag_song');
	$('#tag_song').attr('class','').addClass('thumbs_down');
	$('#venues_list').hide()
	$('#tag_song').show()
	var t = setTimeout('soundscape.show.song()',800);
}

soundscape.show.song = function(){
	$('#tag_song').show()
	var show_song = function(song){
		var html = '<li><span class="artist_name">' + song.artist + '</span><br /><span class="song_title">' + song.title + '</span></li>';
		$('#tag_song ul').empty().append(html);
		
	}
	soundscape.api.get_song(soundscape.billie,show_song)
	
}

soundscape.audio = {};
soundscape.audio.server = 'http://10.11.46.7:3000';



soundscape.audio.start_recording = function(){
		if(navigator.audio && confirm("Delete existing recording?"))
		{
			deleteRecording();//todo
		}
		navigator.audio = new Media(null,recording_success,recording_failure);
		
		$('#cd-button').attr('src','cd.png');
		debug.log("Starting recording...");
		navigator.audio.startAudioRecord();
		navigator.notification.activityStart();
		$('#record-button').attr('src','stop.png');
	navigator.audio.startAudioRecord();
	
}
soundscape.audio.stop_recording = function(){
	
}
soundscape.audio.post_audio = function(){
	
}
soundscape.audio.get_fingerprint = function(){
	
}

soundscape.loc = {};
soundscape.loc.get_loc = function(){

soundscape.geo = {};
soundscape.geo.get_lat_lon = function(callback){
	var onSuccess = function(position) {
	    alert('Latitude: '          + position.coords.latitude          + '\n' +
	          'Longitude: '         + position.coords.longitude         + '\n' +
	          'Altitude: '          + position.coords.altitude          + '\n' +
	          'Accuracy: '          + position.coords.accuracy          + '\n' +
	          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
	          'Heading: '           + position.coords.heading           + '\n' +
	          'Speed: '             + position.coords.speed             + '\n' +
	          'Timestamp: '         + new Date(position.timestamp)      + '\n');
	};

	// onError Callback receives a PositionError object
	//
	function onError(error) {
	    alert('code: '    + error.code    + '\n' +
	          'message: ' + error.message + '\n');
	}

	navigator.geolocation.getCurrentPosition(onSuccess, onError);

	// alert('go')
	// var success = function(response){
	// 	alert('success')
	// 	callback(response);
	// }
	// var error = function(){
	// 	alert('Sorry, we couldn\'t get your location');
	// }
	// navigator.geolocation.getCurrentPosition(success,error);
}

soundscape.venues = {}
// soundscape.venues.
}
