const Meeting = require('../models/meetingModel');
const Chat = require('../models/chatModel');
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

exports.patchMeeting = catchAsync(async (req, res, next) => {
    const {meetingId, user} = req.body;
    const body = {id: user.id, name: user.name, imgUrl: user.imgUrl};
    let meeting;
    if(user.role === 'doctor') {
        meeting = await Meeting.findOneAndUpdate({meetingId}, {doctor: body});
    }else if(user.role === 'patient') {
        meeting = await Meeting.findOneAndUpdate({meetingId}, {patient: body});
    }

    if(meeting.doctor && meeting.patient) {
        const chat = await Chat.find({doctor: meeting.doctor, patient: meeting.patient});
        if(chat.length === 0){
            await Chat.create({doctor: meeting.doctor, patient: meeting.patient});
        }
    }

    res.status(200).json({
        status: 'success',
        message: 'Meeting updated',
    });
}
);