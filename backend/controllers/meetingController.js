const Meeting = require('../models/meetingModel');
const catchAsync = require('../utils/catchAsync');

exports.addMeeting = catchAsync(async (req, res, next) => {
    const newMeeting = await Meeting.create(req.body);
    res.status(200).json({
        status: 'success',
        data: {
        meeting: newMeeting,
        },
    });
});
    
exports.getMeeting = catchAsync(async (req, res, next) => {
    const meetings = await Meeting.find();
    if (meetings.length > 0) {
        res.status(200).json({
            status: 'success',
            data: {
                meeting: meetings[0],
            },
        });
    } else {
        res.status(404).json({
            status: 'fail',
            message: 'No meetings found',
        });
    }
});

exports.deleteMeeting = catchAsync(async (req, res, next) => {
    await Meeting.deleteMany();
    res.status(200).json({
        status: 'success',
        message: 'Meeting deleted',
    });
});