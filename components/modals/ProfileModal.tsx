import React from 'react'
import { Modal, TouchableOpacity } from 'react-native'
import ModalHeader from '../ModalHeader'

export default function ProfileModal({ isVisible, onClose }: { isVisible: boolean, onClose: () => void }) {
    return (
        <Modal
            animationType="slide"
            transparent
            visible={isVisible}
            onRequestClose={() => { }}
        >
            <ModalHeader title="Profile" onClose={onClose} />

            <TouchableOpacity onPress={() => {
                onClose()
                console.log('Sign Out')
            }}>
                Sign Out
            </TouchableOpacity>
        </Modal>
    )
}
