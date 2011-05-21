//
//  RecordingEncoder.m
//
//  Created by Matt Crider, Dec. 2010.
//  Copyright 2010 Pensive Industries
//  MIT licensed
//

/**
 * This class converts the current audio recording to MP3 format
 * @constructor
 */
function RecordingEncoder() {
}

/**
 * Save the screenshot to the user's Photo Library
 */
RecordingEncoder.prototype.encodeRecording = function(recordingURL) {
    PhoneGap.exec("RecordingEncoder.encodeRecording", recordingURL);
};

PhoneGap.addConstructor(function()
{
	if(!window.plugins)
	{
		window.plugins = {};
	}
    window.plugins.recordingEncoder = new RecordingEncoder();
});
