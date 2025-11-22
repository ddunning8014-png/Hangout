import React, { useState } from 'react';
import { Calendar, Plus, X, MapPin, Clock, Users, Check, XCircle, HelpCircle, User } from 'lucide-react';

export default function HangoutPlanner() {
  const [view, setView] = useState('calendar');
  const [showNewEvent, setShowNewEvent] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAddFriends, setShowAddFriends] = useState(false);
  const [showManageFriends, setShowManageFriends] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showFriendProfile, setShowFriendProfile] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [locationCategory, setLocationCategory] = useState('all');
  const [inviteSearchQuery, setInviteSearchQuery] = useState('');
  const [inviteScoreFilter, setInviteScoreFilter] = useState('all');
  const [friendSearchQuery, setFriendSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  // Current user profile (mock data)
  const [currentUser, setCurrentUser] = useState({
    id: 'me',
    name: 'You',
    avatar: '😊',
    profileImage: null, // null = no image uploaded yet
    emojis: ['🎨', '☕', '🎮'], // Three representative emojis
    status: 'Living my best life',
    email: 'you@example.com',
    flakerScore: 4.2, // Score out of 5
    hangoutHistory: {
      totalAccepted: 12,
      attended: 10,
      cancelledAdvance: 1,
      cancelledLastMinute: 0,
      noShows: 1,
      hostReports: { positive: 8, total: 10 }
    }
  });
  
  // Mock friends data with profiles
  const [friends, setFriends] = useState([
    { id: 1, name: 'Alex Chen', avatar: '🎨', emojis: ['🎨', '☕', '📚'], status: 'Always down for coffee', flakerScore: 4.5, hangoutHistory: { totalAccepted: 15, attended: 14, cancelledAdvance: 1, cancelledLastMinute: 0, noShows: 0, hostReports: { positive: 12, total: 14 } } },
    { id: 2, name: 'Jordan Smith', avatar: '🎮', emojis: ['🎮', '🎬', '🍕'], status: 'Gaming enthusiast', flakerScore: 3.8, hangoutHistory: { totalAccepted: 10, attended: 8, cancelledAdvance: 1, cancelledLastMinute: 1, noShows: 0, hostReports: { positive: 7, total: 8 } } },
    { id: 3, name: 'Sam Rivera', avatar: '🎬', emojis: ['🎬', '🍜', '📷'], status: 'Movie buff', flakerScore: 4.7, hangoutHistory: { totalAccepted: 20, attended: 19, cancelledAdvance: 0, cancelledLastMinute: 0, noShows: 1, hostReports: { positive: 18, total: 19 } } },
    { id: 4, name: 'Taylor Kim', avatar: '🏃', emojis: ['🏃', '💪', '🌍'], status: 'Fitness lover', flakerScore: 3.2, hangoutHistory: { totalAccepted: 8, attended: 6, cancelledAdvance: 0, cancelledLastMinute: 1, noShows: 1, hostReports: { positive: 5, total: 6 } } },
    { id: 5, name: 'Morgan Lee', avatar: '🍕', emojis: ['🍕', '🎵', '🎨'], status: 'Foodie', flakerScore: 4.1, hangoutHistory: { totalAccepted: 12, attended: 10, cancelledAdvance: 1, cancelledLastMinute: 0, noShows: 1, hostReports: { positive: 9, total: 10 } } },
    { id: 6, name: 'Casey Park', avatar: '📚', emojis: ['📚', '☕', '🎵'], status: 'Bookworm', flakerScore: 4.9, hangoutHistory: { totalAccepted: 18, attended: 18, cancelledAdvance: 0, cancelledLastMinute: 0, noShows: 0, hostReports: { positive: 17, total: 18 } } },
  ]);

  // Mock potential friends to add
  const [potentialFriends] = useState([
    { id: 7, name: 'Riley Davis', avatar: '🎵', emojis: ['🎵', '🎸', '🎤'], status: 'Music lover', flakerScore: 3.9, hangoutHistory: { totalAccepted: 11, attended: 9, cancelledAdvance: 1, cancelledLastMinute: 1, noShows: 0, hostReports: { positive: 8, total: 9 } } },
    { id: 8, name: 'Avery Brown', avatar: '🌍', emojis: ['🌍', '✈️', '📸'], status: 'Travel enthusiast', flakerScore: 2.8, hangoutHistory: { totalAccepted: 7, attended: 5, cancelledAdvance: 0, cancelledLastMinute: 1, noShows: 1, hostReports: { positive: 4, total: 5 } } },
    { id: 9, name: 'Quinn Wilson', avatar: '🍜', emojis: ['🍜', '🍕', '🍣'], status: 'Ramen connoisseur', flakerScore: 4.3, hangoutHistory: { totalAccepted: 14, attended: 12, cancelledAdvance: 1, cancelledLastMinute: 0, noShows: 1, hostReports: { positive: 11, total: 12 } } },
    { id: 10, name: 'Drew Martinez', avatar: '📷', emojis: ['📷', '🎨', '🌅'], status: 'Photographer', flakerScore: 4.6, hangoutHistory: { totalAccepted: 16, attended: 15, cancelledAdvance: 0, cancelledLastMinute: 1, noShows: 0, hostReports: { positive: 14, total: 15 } } },
  ]);
  
  // Local businesses/spots
  const [localSpots] = useState([
    { id: 1, name: 'Brew & Bean Coffee', category: 'cafe', address: '123 Main St', rating: 4.5, icon: '☕' },
    { id: 2, name: 'The Daily Grind', category: 'cafe', address: '456 Oak Ave', rating: 4.3, icon: '☕' },
    { id: 3, name: 'AMC Downtown Theater', category: 'entertainment', address: '789 Cinema Blvd', rating: 4.7, icon: '🎬' },
    { id: 4, name: 'Sunset Cinema', category: 'entertainment', address: '321 Film St', rating: 4.4, icon: '🎬' },
    { id: 5, name: 'Pizza Paradise', category: 'restaurant', address: '555 Food Court', rating: 4.6, icon: '🍕' },
    { id: 6, name: 'Burger Haven', category: 'restaurant', address: '777 Diner Dr', rating: 4.2, icon: '🍔' },
    { id: 7, name: 'Green Park', category: 'outdoor', address: '999 Nature Way', rating: 4.8, icon: '🌳' },
    { id: 8, name: 'Riverside Trail', category: 'outdoor', address: '111 River Rd', rating: 4.5, icon: '🚶' },
    { id: 9, name: 'FitLife Gym', category: 'fitness', address: '222 Health St', rating: 4.4, icon: '💪' },
    { id: 10, name: 'Bookworm Cafe', category: 'cafe', address: '333 Reading Ln', rating: 4.7, icon: '📚' },
  ]);
  
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Coffee catch-up ☕',
      date: '2025-11-15',
      time: '3:00 PM',
      location: 'Downtown Cafe',
      invites: [
        { friendId: 1, status: 'accepted' },
        { friendId: 2, status: 'maybe' }
      ],
      color: 'bg-pink-400'
    },
    {
      id: 2,
      title: 'Movie night 🎬',
      date: '2025-11-18',
      time: '7:30 PM',
      location: 'AMC Theater',
      invites: [
        { friendId: 3, status: 'accepted' },
        { friendId: 4, status: 'accepted' },
        { friendId: 5, status: 'declined' }
      ],
      color: 'bg-purple-400'
    }
  ]);
  
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    invites: []
  });

  const colors = ['bg-pink-400', 'bg-purple-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-orange-400'];

  const toggleFriendInvite = (friendId) => {
    const isInvited = newEvent.invites.some(inv => inv.friendId === friendId);
    if (isInvited) {
      setNewEvent({
        ...newEvent,
        invites: newEvent.invites.filter(inv => inv.friendId !== friendId)
      });
    } else {
      setNewEvent({
        ...newEvent,
        invites: [...newEvent.invites, { friendId, status: 'pending' }]
      });
    }
  };

  const handleCreateEvent = () => {
    if (newEvent.title && newEvent.date) {
      const event = {
        id: Date.now(),
        ...newEvent,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
      setEvents([...events, event]);
      setNewEvent({ title: '', date: '', time: '', location: '', invites: [] });
      setShowNewEvent(false);
    }
  };

  const updateInviteStatus = (eventId, friendId, status) => {
    setEvents(events.map(event => {
      if (event.id === eventId) {
        return {
          ...event,
          invites: event.invites.map(inv =>
            inv.friendId === friendId ? { ...inv, status } : inv
          )
        };
      }
      return event;
    }));
  };

  const getFriendById = (id) => friends.find(f => f.id === id);

  const getInviteStatusIcon = (status) => {
    switch(status) {
      case 'accepted': return <Check size={16} className="text-green-500" />;
      case 'declined': return <XCircle size={16} className="text-red-500" />;
      case 'maybe': return <HelpCircle size={16} className="text-yellow-500" />;
      default: return <Clock size={16} className="text-gray-400" />;
    }
  };

  const getInviteStatusBadge = (status) => {
    switch(status) {
      case 'accepted': return 'bg-green-100 text-green-700';
      case 'declined': return 'bg-red-100 text-red-700';
      case 'maybe': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const categories = [
    { id: 'all', name: 'All', icon: '🌟' },
    { id: 'cafe', name: 'Cafes', icon: '☕' },
    { id: 'restaurant', name: 'Food', icon: '🍽️' },
    { id: 'entertainment', name: 'Entertainment', icon: '🎬' },
    { id: 'outdoor', name: 'Outdoor', icon: '🌳' },
    { id: 'fitness', name: 'Fitness', icon: '💪' },
  ];

  const filteredSpots = locationCategory === 'all' 
    ? localSpots 
    : localSpots.filter(spot => spot.category === locationCategory);

  const selectLocation = (spot) => {
    setNewEvent({ ...newEvent, location: `${spot.name} - ${spot.address}` });
    setShowLocationPicker(false);
  };

  // Calculate Flaker Score (1-5 scale)
  const calculateFlakerScore = (user) => {
    const history = user.hangoutHistory;
    
    // Need at least 5 hangouts to show score
    if (history.totalAccepted < 5) {
      return null;
    }

    // Cap effect at 30 events to prevent power user dominance
    const cappedTotal = Math.min(history.totalAccepted, 30);
    
    // 50% Weight: Attendance Consistency
    const attendanceRate = history.attended / cappedTotal;
    const attendanceScore = attendanceRate * 5;
    
    // 30% Weight: Cancellation Quality
    let cancellationScore = 5;
    const lastMinutePenalty = (history.cancelledLastMinute / cappedTotal) * 2; // Moderate impact
    const noShowPenalty = (history.noShows / cappedTotal) * 4; // Large impact
    cancellationScore = Math.max(0, cancellationScore - lastMinutePenalty - noShowPenalty);
    
    // 20% Weight: Host-Reported Reliability
    const hostReportRate = history.hostReports.total > 0 
      ? history.hostReports.positive / history.hostReports.total 
      : 1; // Default to 1 if no reports
    const hostReportScore = hostReportRate * 5;
    
    // Weighted final score
    const finalScore = (attendanceScore * 0.5) + (cancellationScore * 0.3) + (hostReportScore * 0.2);
    
    return Math.round(finalScore * 10) / 10; // Round to 1 decimal
  };

  const flakerScore = calculateFlakerScore(currentUser);

  const getFlakerScoreColor = (score) => {
    if (score >= 4.5) return 'text-green-600';
    if (score >= 3.5) return 'text-teal-600';
    if (score >= 2.5) return 'text-yellow-600';
    if (score >= 1.5) return 'text-orange-600';
    return 'text-red-600';
  };

  const getFlakerScoreEmoji = (score) => {
    if (score >= 4.5) return '⭐';
    if (score >= 3.5) return '👍';
    if (score >= 2.5) return '😐';
    if (score >= 1.5) return '😕';
    return '😞';
  };

  const addFriend = (friendId) => {
    const friendToAdd = potentialFriends.find(f => f.id === friendId);
    if (friendToAdd && !friends.find(f => f.id === friendId)) {
      setFriends([...friends, friendToAdd]);
    }
  };

  const removeFriend = (friendId) => {
    setFriends(friends.filter(f => f.id !== friendId));
  };

  const filteredPotentialFriends = potentialFriends.filter(
    friend => 
      !friends.find(f => f.id === friend.id) &&
      friend.name.toLowerCase().includes(friendSearchQuery.toLowerCase())
  );

  const filteredExistingFriends = friends.filter(
    friend => friend.name.toLowerCase().includes(friendSearchQuery.toLowerCase())
  );

  const viewFriendProfile = (friend) => {
    setSelectedFriend(friend);
    setShowFriendProfile(true);
    setShowAddFriends(false);
    setShowManageFriends(false);
  };

  const getFilteredInviteFriends = () => {
    let filtered = friends;
    
    // Filter by search query
    if (inviteSearchQuery) {
      filtered = filtered.filter(friend => 
        friend.name.toLowerCase().includes(inviteSearchQuery.toLowerCase())
      );
    }
    
    // Filter by Flaker Score
    if (inviteScoreFilter !== 'all') {
      filtered = filtered.filter(friend => {
        if (inviteScoreFilter === '4+') return friend.flakerScore >= 4;
        if (inviteScoreFilter === '3-4') return friend.flakerScore >= 3 && friend.flakerScore < 4;
        if (inviteScoreFilter === '<3') return friend.flakerScore < 3;
        return true;
      });
    }
    
    return filtered;
  };

  const getDaysInMonth = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const getEventsForDay = (day) => {
    const date = new Date();
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr);
  };

  const today = new Date().getDate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 via-teal-400 via-30% to-rose-400 bg-clip-text text-transparent">
            hangouts
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setShowAddFriends(true); setFriendSearchQuery(''); }}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="Add Friends"
            >
              <Plus size={24} className="text-gray-700" />
            </button>
            <button
              onClick={() => setShowProfile(true)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="Profile"
            >
              <User size={24} className="text-gray-700" />
            </button>
            <button
              onClick={() => setShowNewEvent(true)}
              className="bg-gradient-to-r from-cyan-500 via-teal-400 via-30% to-rose-400 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:shadow-lg transition-shadow"
            >
              <Plus size={20} />
              New
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Navigation */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setView('calendar')}
            className={`flex-1 py-3 rounded-xl font-medium transition-all ${
              view === 'calendar'
                ? 'bg-white shadow-md text-cyan-500'
                : 'bg-white/50 text-gray-600'
            }`}
          >
            <Calendar size={18} className="inline mr-2" />
            Calendar
          </button>
          <button
            onClick={() => setView('upcoming')}
            className={`flex-1 py-3 rounded-xl font-medium transition-all ${
              view === 'upcoming'
                ? 'bg-white shadow-md text-cyan-500'
                : 'bg-white/50 text-gray-600'
            }`}
          >
            Upcoming
          </button>
        </div>

        {/* Calendar View */}
        {view === 'calendar' && (
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">November 2025</h2>
            </div>
            
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-semibold text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {getDaysInMonth().map((day, idx) => {
                const dayEvents = day ? getEventsForDay(day) : [];
                return (
                  <div
                    key={idx}
                    className={`aspect-square rounded-xl p-2 ${
                      day
                        ? day === today
                          ? 'bg-gradient-to-br from-cyan-300 via-teal-200 via-30% to-rose-300 font-bold'
                          : 'bg-gray-50 hover:bg-gray-100'
                        : ''
                    } transition-colors`}
                  >
                    {day && (
                      <>
                        <div className="text-sm text-gray-700">{day}</div>
                        <div className="flex gap-1 mt-1 flex-wrap">
                          {dayEvents.map(event => (
                            <div
                              key={event.id}
                              className={`w-1.5 h-1.5 rounded-full ${event.color}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Upcoming View */}
        {view === 'upcoming' && (
          <div className="space-y-4">
            {events.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
                <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">No hangouts planned yet</p>
                <p className="text-gray-400 text-sm mt-2">Tap the + button to create one</p>
              </div>
            ) : (
              events.map(event => (
                <div
                  key={event.id}
                  className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl ${event.color} flex-shrink-0`} />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-800 mb-2">{event.title}</h3>
                      <div className="space-y-1 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <Clock size={16} />
                          <span>{event.date} at {event.time}</span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-2">
                            <MapPin size={16} />
                            <span>{event.location}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Invites List */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                          <Users size={16} />
                          <span>Invited ({event.invites.length})</span>
                        </div>
                        {event.invites.map(invite => {
                          const friend = getFriendById(invite.friendId);
                          return (
                            <div key={invite.friendId} className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{friend.avatar}</span>
                                <div>
                                  <div className="font-medium text-gray-800">{friend.name}</div>
                                  <div className="text-xs text-gray-500">{friend.status}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getInviteStatusBadge(invite.status)}`}>
                                  {invite.status}
                                </span>
                                {/* Demo buttons to change status */}
                                <div className="flex gap-1">
                                  <button
                                    onClick={() => updateInviteStatus(event.id, invite.friendId, 'accepted')}
                                    className="p-1 hover:bg-green-100 rounded"
                                    title="Accept"
                                  >
                                    <Check size={16} className="text-green-600" />
                                  </button>
                                  <button
                                    onClick={() => updateInviteStatus(event.id, invite.friendId, 'maybe')}
                                    className="p-1 hover:bg-yellow-100 rounded"
                                    title="Maybe"
                                  >
                                    <HelpCircle size={16} className="text-yellow-600" />
                                  </button>
                                  <button
                                    onClick={() => updateInviteStatus(event.id, invite.friendId, 'declined')}
                                    className="p-1 hover:bg-red-100 rounded"
                                    title="Decline"
                                  >
                                    <XCircle size={16} className="text-red-600" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* New Event Modal */}
      {showNewEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md p-6 my-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">New Hangout</h2>
              <button
                onClick={() => setShowNewEvent(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="What's the plan? 🎉"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-purple-400 outline-none"
              />
              
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-[#4a8CFF] outline-none"
              />
              
              <input
                type="time"
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-[#4a8CFF] outline-none"
              />
              
              {/* Location Input with Picker Button */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Where? 📍"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-cyan-400 outline-none pr-24"
                />
                <button
                  type="button"
                  onClick={() => setShowLocationPicker(true)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-cyan-400 text-white text-sm rounded-lg hover:bg-cyan-500 transition-colors"
                >
                  Browse
                </button>
              </div>
              
              {/* Friends Selection */}
              <div>
                                  <div className="flex items-center gap-2 mb-3 text-sm font-medium text-gray-700">
                  <Users size={16} />
                  <span>Invite Friends</span>
                  {newEvent.invites.length > 0 && (
                    <span className="text-cyan-500">({newEvent.invites.length} selected)</span>
                  )}
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {friends.map(friend => {
                    const isInvited = newEvent.invites.some(inv => inv.friendId === friend.id);
                    return (
                      <button
                        key={friend.id}
                        onClick={() => toggleFriendInvite(friend.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                          isInvited
                            ? 'bg-gradient-to-r from-cyan-300 via-teal-200 via-30% to-rose-300 ring-2 ring-cyan-400'
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        <span className="text-2xl">{friend.avatar}</span>
                        <div className="flex-1 text-left">
                          <div className="font-medium text-gray-800">{friend.name}</div>
                          <div className="text-xs text-gray-500">{friend.status}</div>
                        </div>
                        {isInvited && (
                          <Check size={20} className="text-cyan-600" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              <button
                onClick={handleCreateEvent}
                disabled={!newEvent.title || !newEvent.date}
                className="w-full bg-gradient-to-r from-cyan-500 via-teal-400 via-30% to-rose-400 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Hangout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Location Picker Modal */}
      {showLocationPicker && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md p-6 my-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Choose a Spot</h2>
              <button
                onClick={() => setShowLocationPicker(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setLocationCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    locationCategory === cat.id
                      ? 'bg-gradient-to-r from-cyan-500 via-teal-400 via-30% to-rose-400 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="mr-1">{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Spots List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredSpots.map(spot => (
                <button
                  key={spot.id}
                  onClick={() => selectLocation(spot)}
                  className="w-full flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gradient-to-r hover:from-cyan-200 hover:via-teal-100 hover:via-30% hover:to-rose-200 transition-all text-left"
                >
                  <span className="text-3xl">{spot.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{spot.name}</div>
                    <div className="text-sm text-gray-500">{spot.address}</div>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500 text-sm">
                    <span>⭐</span>
                    <span className="font-medium">{spot.rating}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md p-6 my-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Profile</h2>
              <button
                onClick={() => setShowProfile(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            {/* Profile Content */}
            <div className="space-y-6">
              {/* Avatar and Basic Info */}
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-300 via-teal-200 via-30% to-rose-300 flex items-center justify-center text-5xl mb-4">
                  {currentUser.avatar}
                </div>
                <p className="text-gray-500 mb-3">{currentUser.email}</p>
                
                {/* Three Emojis Below Name */}
                <div className="flex gap-2 mb-4">
                  {currentUser.emojis.map((emoji, idx) => (
                    <span key={idx} className="text-2xl">{emoji}</span>
                  ))}
                </div>
              </div>

              {/* Me Section with Status */}
              <div className="bg-gray-50 rounded-xl p-4">
                <label className="text-base font-medium bg-gradient-to-r from-cyan-500 via-teal-400 via-30% to-rose-400 bg-clip-text text-transparent mb-2 block">Me</label>
                <input
                  type="text"
                  value={currentUser.status}
                  readOnly
                  maxLength={60}
                  className="w-full px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-800"
                  placeholder="Add a short description (max 60 characters)"
                />
                <div className="text-xs text-gray-400 mt-1 text-right">{currentUser.status.length}/60</div>
              </div>

              {/* Flaker Score */}
              {flakerScore !== null ? (
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-base font-medium bg-gradient-to-r from-cyan-500 via-teal-400 via-30% to-rose-400 bg-clip-text text-transparent">Flaker Score</label>
                    <div className="group relative">
                      <HelpCircle size={16} className="text-gray-400 cursor-help" />
                      <div className="absolute right-0 top-6 w-64 bg-gray-800 text-white text-xs rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg">
                        Based on your attendance, cancellations, and confirmations over the last 90 days. Only in-app actions count.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{getFlakerScoreEmoji(flakerScore)}</span>
                    <div className="flex-1">
                      <div className={`text-3xl font-bold ${getFlakerScoreColor(flakerScore)} mb-1`}>
                        {flakerScore}
                      </div>
                      <div className="text-xs text-gray-500 mb-2">out of 5.0</div>
                      {/* Progress Bar */}
                      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 via-30% to-rose-400 transition-all duration-500"
                          style={{ width: `${(flakerScore / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <HelpCircle size={24} className="text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Flaker Score will appear after 5 hangouts</p>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-cyan-500 via-teal-400 via-30% to-rose-400 bg-clip-text text-transparent">
                    {events.length + events.reduce((acc, e) => acc + e.invites.filter(i => i.status === 'accepted').length, 0)}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Hangout Count</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-cyan-500 via-teal-400 via-30% to-rose-400 bg-clip-text text-transparent">
                    {friends.length}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Friends</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button 
                  onClick={() => { setShowProfile(false); setShowManageFriends(true); setFriendSearchQuery(''); }}
                  className="w-full bg-gray-50 hover:bg-gray-100 text-gray-800 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Users size={18} />
                  Manage Friends
                </button>
                <button 
                  onClick={() => { setShowProfile(false); setShowEditProfile(true); }}
                  className="w-full bg-gray-50 hover:bg-gray-100 text-gray-800 py-3 rounded-xl font-medium transition-colors"
                >
                  Edit Profile
                </button>
                <button 
                  onClick={() => { setShowProfile(false); setShowSettings(true); }}
                  className="w-full bg-gray-50 hover:bg-gray-100 text-gray-800 py-3 rounded-xl font-medium transition-colors"
                >
                  Settings
                </button>
                <button className="w-full bg-red-50 hover:bg-red-100 text-red-600 py-3 rounded-xl font-medium transition-colors">
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Friends Modal */}
      {showAddFriends && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md p-6 my-auto max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Add Friends</h2>
              <button
                onClick={() => setShowAddFriends(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search for friends..."
              value={friendSearchQuery}
              onChange={(e) => setFriendSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-cyan-400 outline-none mb-4"
            />

            {/* Potential Friends List */}
            <div className="space-y-2">
              {filteredPotentialFriends.length > 0 ? (
                filteredPotentialFriends.map(friend => (
                  <div key={friend.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                    <span className="text-2xl">{friend.avatar}</span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{friend.name}</div>
                      <div className="flex gap-1 mt-1">
                        {friend.emojis.map((emoji, idx) => (
                          <span key={idx} className="text-sm">{emoji}</span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => viewFriendProfile(friend)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      View
                    </button>
                    <button
                      onClick={() => addFriend(friend.id)}
                      className="bg-gradient-to-r from-cyan-500 via-teal-400 via-30% to-rose-400 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-shadow"
                    >
                      Add
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">No users found</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Manage Friends Modal */}
      {showManageFriends && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md p-6 my-auto max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Manage Friends</h2>
              <button
                onClick={() => setShowManageFriends(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search friends..."
              value={friendSearchQuery}
              onChange={(e) => setFriendSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-cyan-400 outline-none mb-4"
            />

            {/* Current Friends List */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Your Friends ({friends.length})</h3>
              <div className="space-y-2">
                {filteredExistingFriends.length > 0 ? (
                  filteredExistingFriends.map(friend => (
                    <div key={friend.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                      <span className="text-2xl">{friend.avatar}</span>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{friend.name}</div>
                        <div className="flex gap-1 mt-1">
                          {friend.emojis.map((emoji, idx) => (
                            <span key={idx} className="text-sm">{emoji}</span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => viewFriendProfile(friend)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        View
                      </button>
                      <button
                        onClick={() => removeFriend(friend.id)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-4">No friends found</p>
                )}
              </div>
            </div>

            {/* Add New Friends Section */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Add New Friends</h3>
              <div className="space-y-2">
                {filteredPotentialFriends.slice(0, 3).map(friend => (
                  <div key={friend.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                    <span className="text-2xl">{friend.avatar}</span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{friend.name}</div>
                      <div className="flex gap-1 mt-1">
                        {friend.emojis.map((emoji, idx) => (
                          <span key={idx} className="text-sm">{emoji}</span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => viewFriendProfile(friend)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      View
                    </button>
                    <button
                      onClick={() => addFriend(friend.id)}
                      className="bg-gradient-to-r from-cyan-500 via-teal-400 via-30% to-rose-400 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-shadow"
                    >
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md p-6 my-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Edit Profile</h2>
              <button
                onClick={() => setShowEditProfile(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Profile Avatar */}
              <div className="text-center">
                <label className="text-sm font-medium text-gray-700 block mb-3">Profile Image</label>
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-300 via-teal-200 via-30% to-rose-300 flex items-center justify-center text-5xl mx-auto mb-4">
                  {currentUser.avatar}
                </div>
                <button className="bg-gradient-to-r from-cyan-500 via-teal-400 via-30% to-rose-400 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-shadow">
                  {currentUser.profileImage ? 'Change Image' : 'Add Image'}
                </button>
              </div>

              {/* Three Representative Emojis */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-3">Your Vibe (Pick 3 emojis)</label>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {currentUser.emojis.map((emoji, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-xl p-4 text-center">
                      <div className="text-3xl mb-2">{emoji}</div>
                      <div className="text-xs text-gray-500">Emoji {idx + 1}</div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 flex-wrap">
                  {['🎨', '☕', '🎮', '🎬', '🏃', '🍕', '📚', '🎵', '🌍', '📷', '💪', '🍜'].map(emoji => (
                    <button
                      key={emoji}
                      onClick={() => {
                        const newEmojis = [...currentUser.emojis];
                        if (!newEmojis.includes(emoji) && newEmojis.length < 3) {
                          newEmojis.push(emoji);
                        } else if (newEmojis.includes(emoji)) {
                          newEmojis.splice(newEmojis.indexOf(emoji), 1);
                        }
                        setCurrentUser({...currentUser, emojis: newEmojis.slice(0, 3)});
                      }}
                      className={`text-2xl p-2 rounded-lg transition-all ${
                        currentUser.emojis.includes(emoji)
                          ? 'bg-gradient-to-r from-cyan-200 via-teal-100 via-30% to-rose-200 ring-2 ring-cyan-400'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setShowEditProfile(false)}
                className="w-full bg-gradient-to-r from-cyan-500 via-teal-400 via-30% to-rose-400 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-shadow"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Friend Profile Modal */}
      {showFriendProfile && selectedFriend && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md p-6 my-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Profile</h2>
              <button
                onClick={() => setShowFriendProfile(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Avatar and Basic Info */}
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-300 via-teal-200 via-30% to-rose-300 flex items-center justify-center text-5xl mb-4">
                  {selectedFriend.avatar}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{selectedFriend.name}</h3>
                
                {/* Three Emojis Below Name */}
                <div className="flex gap-2 mb-4">
                  {selectedFriend.emojis.map((emoji, idx) => (
                    <span key={idx} className="text-2xl">{emoji}</span>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="bg-gray-50 rounded-xl p-4">
                <label className="text-base font-medium bg-gradient-to-r from-cyan-500 via-teal-400 via-30% to-rose-400 bg-clip-text text-transparent mb-2 block">About</label>
                <p className="text-gray-700">{selectedFriend.status}</p>
              </div>

              {/* Flaker Score */}
              {selectedFriend.flakerScore && calculateFlakerScore(selectedFriend) !== null ? (
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-base font-medium bg-gradient-to-r from-cyan-500 via-teal-400 via-30% to-rose-400 bg-clip-text text-transparent">Flaker Score</label>
                    <div className="group relative">
                      <HelpCircle size={16} className="text-gray-400 cursor-help" />
                      <div className="absolute right-0 top-6 w-64 bg-gray-800 text-white text-xs rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg">
                        Based on their attendance, cancellations, and confirmations over the last 90 days. Only in-app actions count.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{getFlakerScoreEmoji(selectedFriend.flakerScore)}</span>
                    <div className="flex-1">
                      <div className={`text-3xl font-bold ${getFlakerScoreColor(selectedFriend.flakerScore)} mb-1`}>
                        {selectedFriend.flakerScore}
                      </div>
                      <div className="text-xs text-gray-500 mb-2">out of 5.0</div>
                      {/* Progress Bar */}
                      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 via-30% to-rose-400 transition-all duration-500"
                          style={{ width: `${(selectedFriend.flakerScore / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <HelpCircle size={24} className="text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Flaker Score will appear after 5 hangouts</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                {!friends.find(f => f.id === selectedFriend.id) ? (
                  <button
                    onClick={() => {
                      addFriend(selectedFriend.id);
                      setShowFriendProfile(false);
                    }}
                    className="w-full bg-gradient-to-r from-cyan-500 via-teal-400 via-30% to-rose-400 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-shadow"
                  >
                    Add Friend
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      removeFriend(selectedFriend.id);
                      setShowFriendProfile(false);
                    }}
                    className="w-full bg-red-50 hover:bg-red-100 text-red-600 py-3 rounded-xl font-medium transition-colors"
                  >
                    Remove Friend
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md p-6 my-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Settings</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <div className="font-medium text-gray-800">Dark Mode</div>
                  <div className="text-sm text-gray-500">Toggle dark/light theme</div>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    darkMode ? 'bg-gradient-to-r from-cyan-500 to-rose-400' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                      darkMode ? 'transform translate-x-6' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Notifications Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <div className="font-medium text-gray-800">Notifications</div>
                  <div className="text-sm text-gray-500">Receive hangout updates</div>
                </div>
                <button
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    notificationsEnabled ? 'bg-gradient-to-r from-cyan-500 to-rose-400' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                      notificationsEnabled ? 'transform translate-x-6' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Other Settings */}
              <button className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-xl text-left transition-colors">
                <div className="font-medium text-gray-800">Privacy Settings</div>
                <div className="text-sm text-gray-500">Control who can see your profile</div>
              </button>

              <button className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-xl text-left transition-colors">
                <div className="font-medium text-gray-800">About</div>
                <div className="text-sm text-gray-500">App version & info</div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
