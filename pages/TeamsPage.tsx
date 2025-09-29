import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAuth } from '../context/AuthContext';
import { Team, Project, TeamMember } from '../types';
import { UsersIcon, PlusIcon, TrashIcon, EditIcon } from '../components/icons';

// Mock data for display
const mockUsers: Omit<TeamMember, 'role' | 'sub'>[] = [
    { email: 'alex@example.com', name: 'Alex', picture: 'https://randomuser.me/api/portraits/men/32.jpg', email_verified: true },
    { email: 'sara@example.com', name: 'Sara', picture: 'https://randomuser.me/api/portraits/women/44.jpg', email_verified: true },
];

export const TeamsPage: React.FC = () => {
    const { user } = useAuth();
    const [teams, setTeams] = useLocalStorage<Team[]>('silo-build-teams', []);
    const [projects] = useLocalStorage<Project[]>('ai-app-builder-projects', []);

    const createTeam = () => {
        const teamName = prompt("Enter a name for your new team:");
        if (teamName && user) {
            const newTeam: Team = {
                id: crypto.randomUUID(),
                name: teamName,
                createdAt: new Date().toISOString(),
                members: [{ ...user, role: 'owner' }],
            };
            setTeams(prev => [newTeam, ...prev]);
        }
    };

    const deleteTeam = (teamId: string) => {
        if (window.confirm("Are you sure you want to delete this team? This cannot be undone.")) {
            // Note: This doesn't un-assign projects from the team. A more robust solution would handle this.
            setTeams(prev => prev.filter(t => t.id !== teamId));
        }
    };
    
    // a mock function to add member
    const addMember = (teamId: string) => {
        const email = prompt("Enter email of the new member to invite:");
        if (email) {
            const randomUser = mockUsers[Math.floor(Math.random()*mockUsers.length)];
            const newMember: TeamMember = {
                ...randomUser,
                sub: crypto.randomUUID(),
                email: email,
                role: 'member'
            };
            setTeams(teams => teams.map(team => {
                if(team.id === teamId) {
                    // prevent adding duplicates
                    if (team.members.find(m => m.email === email)) {
                        alert("User is already a member of this team.");
                        return team;
                    }
                    return {...team, members: [...team.members, newMember]};
                }
                return team;
            }))
        }
    }


    return (
        <div className="p-8 h-full overflow-y-auto">
            <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <UsersIcon className="w-8 h-8 text-blue-500" />
                    <h1 className="text-3xl font-bold">Teams</h1>
                </div>
                <button onClick={createTeam} className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    <PlusIcon />
                    Create Team
                </button>
            </div>
             <p className="text-gray-600 mb-8 max-w-3xl">
                Collaborate with others by creating teams. Shared projects will be accessible to all team members.
            </p>

            {teams.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center text-gray-500 bg-white/50 rounded-lg p-8 mt-10">
                    <UsersIcon className="w-16 h-16 mb-4 text-gray-400"/>
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">No teams yet</h2>
                    <p>Create a team to start collaborating on projects.</p>
                </div>
            ) : (
                <div className="space-y-8">
                    {teams.map(team => {
                        const teamProjects = projects.filter(p => p.teamId === team.id);
                        return (
                            <div key={team.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h2 className="text-2xl font-bold">{team.name}</h2>
                                        <p className="text-sm text-gray-500">Created on {new Date(team.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => addMember(team.id)} className="text-gray-500 hover:text-gray-800 p-2 hover:bg-gray-100 rounded-full"><PlusIcon /></button>
                                        <button onClick={() => deleteTeam(team.id)} className="text-gray-500 hover:text-red-500 p-2 hover:bg-gray-100 rounded-full"><TrashIcon /></button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="font-semibold mb-2">Members ({team.members.length})</h3>
                                        <div className="space-y-2">
                                            {team.members.map(member => (
                                                <div key={member.sub} className="flex items-center gap-3 bg-gray-50 p-2 rounded-md border border-gray-200">
                                                    <img src={member.picture} alt={member.name} className="w-8 h-8 rounded-full" />
                                                    <div>
                                                        <p className="text-sm font-medium">{member.name}</p>
                                                        <p className="text-xs text-gray-500">{member.email}</p>
                                                    </div>
                                                    <span className="ml-auto text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full capitalize">{member.role}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">Projects ({teamProjects.length})</h3>
                                        {teamProjects.length > 0 ? (
                                            <div className="space-y-2">
                                                {teamProjects.map(p => (
                                                    <a key={p.id} href={`#/project/${p.id}`} className="flex items-center gap-3 bg-gray-50 p-2 rounded-md border border-gray-200 hover:bg-gray-100">
                                                         <div className="w-8 h-8 rounded-md bg-gray-200 flex-shrink-0 flex items-center justify-center border border-gray-300">
                                                           {p.appIcon ? <img src={p.appIcon} alt="" className="w-full h-full object-cover rounded-sm"/> : <EditIcon className="w-4 h-4 text-gray-400" />}
                                                         </div>
                                                        <p className="text-sm font-medium truncate">{p.name}</p>
                                                    </a>
                                                ))}
                                            </div>
                                        ) : <p className="text-sm text-gray-500 italic mt-2">No projects in this team yet.</p>}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}