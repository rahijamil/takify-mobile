import React, { useState } from 'react';
import { View, Button, Platform, Text } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native';

// If your component doesn't receive any props, you can omit this or just use {}
interface DatePickerComponentProps {
    date: string;
    setDate: (date: string) => void;
    datePickerStyle: {
        [key: string]: any
    }
}

const formatDate = (date: Date) => {
    // Create a new Date object with the timezone offset applied
    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    return localDate.toISOString().split('T')[0];
};


const DatePickerComponent: React.FC<DatePickerComponentProps> = ({ date, setDate, datePickerStyle }) => {
    const [show, setShow] = useState<boolean>(false);

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        let currentDate = selectedDate ? formatDate(selectedDate) : date;
        setShow(Platform.OS === 'ios'); // Only necessary if you want the picker to stay open on iOS
        setDate(currentDate);
    };

    const isToday = (dateString: string) => {
        const today = new Date();
        const todayString = formatDate(today); // "YYYY-MM-DD" format
        return (dateString ? dateString : new Date().toISOString().split('T')[0]) === todayString;
    };

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const dateParts = date ? date.split('-') : formatDate(new Date()).split('-');

    const year = dateParts[0];
    const month = months[parseInt(dateParts[1], 10) - 1]; // Convert "01" to 0 for January
    const day = parseInt(dateParts[2], 10);

    return (
        <View style={datePickerStyle}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setShow(true)} style={{
                    borderWidth: 1,
                    borderColor: '#ddd', // light grey for input border
                    borderRadius: 5,
                    paddingVertical: 5,
                    paddingHorizontal: 16,
                    backgroundColor: "white",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <Text style={{
                    color: "#007AFF",
                    fontSize: 14,
                    fontWeight: "500",
                    textAlign: "center"
                }}>
                    {
                        isToday(date) ? "Today" : `${day} ${month}\n${year}`
                    }
                </Text>
            </TouchableOpacity>

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date ? new Date(date) : new Date() as any}
                    mode="date"
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    );
};

export default DatePickerComponent;
