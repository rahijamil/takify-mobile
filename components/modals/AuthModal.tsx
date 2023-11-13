import React from 'react'
import { Modal, View, StyleSheet } from 'react-native'
import ResetPassword from '../auth/ResetPassword'
import Login from '../auth/LogIn'
import SignUp from '../auth/SignUp'
import ModalHeader from '../ModalHeader'
import SignUpSuccess from '../auth/SignUpSucess'

export type AuthStatusType = "login" | "signup" | "forgot-password" | "signup-success" | null;

export default function AuthModal({ authStatus, setAuthStatus, onClose }: { authStatus: AuthStatusType, onClose: () => void, setAuthStatus: React.Dispatch<React.SetStateAction<AuthStatusType>> }) {
    return (
        <Modal
            visible={true}
            animationType="slide"
            transparent
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <ModalHeader onClose={onClose} title={
                    authStatus == "login" ? "Log In" : authStatus == "signup" ? "Sign Up" : authStatus == "forgot-password" ? "Reset Password" : "Sign Up Successful"
                }
                    isLightBackground
                />
                {
                    authStatus == "login"
                        ? <Login setAuthStatus={setAuthStatus} />
                        : authStatus == "signup"
                            ? <SignUp setAuthStatus={setAuthStatus} />
                            : authStatus == "signup-success"
                                ? <SignUpSuccess setAuthStatus={setAuthStatus} />
                                : <ResetPassword setAuthStatus={setAuthStatus} />
                }
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }
})