// Navbar.jsx
import React, { useState , useEffect} from 'react';
import { Menu, LogIn, UserPlus,LogOut  } from 'lucide-react';
import MoneyLadder from './MoneyLadder';
import AuthModal from './models/Authmodel';
import Cookies from 'js-cookie'

const Navbar = ({ currentQuestion }) => {
    const [ladderOpen, setLadderOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState('login');
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const openAuthModal = (mode) => {
        setAuthMode(mode);
        setIsAuthModalOpen(true);
    };

    const closeAuthModal = () => {
        setIsAuthModalOpen(false);
    };

    const switchAuthMode = (mode) => {
        setAuthMode(mode);
    };
    useEffect(() => {
        if(Cookies.get('uid')){
            setIsAuthenticated(true)
        }
        else{
            setIsAuthenticated(false)
        }
        
    }, )
    
    return (
        <>
            <nav className="w-full top-0 z-50 backdrop-blur-lg shadow-2xl border-b border-white/20 text-white">
                <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                    {/* Left: Hamburger + Logo */}
                    <div className="flex items-center gap-3">
                        <button className="p-2 rounded cursor-pointer hover:bg-white/20"
                            onClick={() => setLadderOpen(true)}
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                        <h1 className="text-lg font-semibold hidden sm:block">Kaun Banega Karodpati</h1>
                        <h1 className="text-lg font-semibold block sm:hidden">KBK</h1>
                    </div>

                    {/* Right: Login + Signup */}
                    <div className="flex gap-4">
                        {isAuthenticated? (
                        <button onClick={() => {confirm("Do you want to Logout?")&&Cookies.remove('uid')}} className="flex cursor-pointer items-center gap-2 px-4 py-2 border border-white/30 rounded-lg hover:bg-white/20 transition">
                            <LogOut className="h-4 w-4" />
                            <span>Logout</span>
                        </button>
                            
                        ) : (<div className="flex gap-4" >
                        <button onClick={() => openAuthModal('login')} className="flex cursor-pointer items-center gap-2 px-4 py-2 border border-white/30 rounded-lg hover:bg-white/20 transition">
                            <LogIn className="h-4 w-4" />
                            <span>Login</span>
                        </button>
                        <button onClick={() => openAuthModal('signup')} className="hidden sm:flex cursor-pointer items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition">
                            <UserPlus className="h-4 w-4" />
                            <span>Sign Up</span>
                        </button>
                        </div>
                        )
                        }
                    </div>
                </div>
            </nav >
            {/* Authentication Modal */}
            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={closeAuthModal}
                mode={authMode}
                onSwitchMode={switchAuthMode}
                setAuthMode={setAuthMode}
            />

            {/* Money Ladder Component */}
            < MoneyLadder currentQuestion={currentQuestion} isOpen={ladderOpen} onClose={() => setLadderOpen(false)} />
        </>
    );
};

export default Navbar;
