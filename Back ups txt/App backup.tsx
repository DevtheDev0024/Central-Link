import { useState, useEffect, useMemo } from 'react';
import {
  Users,
  Trophy,
  Star,
  Award,
  Search,
  TrendingUp,
  Calendar,
  Target,
  Crown,
  GraduationCap,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface Member {
  name: string;
  levelCompletion: number;
  projectCompletion: number;
  meetingAwards: number;
  contestExcellence: number;
  evaluationContribution: number;
  trainingPrograms: number;
  educationalSessions: number;
  mentoringAssignments: number;
  leadershipRoles: number;
  clubEvents: number;
  clubContestContribution: number;
  visitingToastmaster: number;
  meetingRolesPoints: number;
  totalPoints: number;
  aiScore: number;
  ajScore: number;
  meetingRoles: string[];
}

const CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vSSr0ffcmGUiYJ5Jj6EyeAGPyftgZcIcDiHYUsODx0QbN8AMYlx4okEWdYVBemLaPPklnCtCxYkuPfo/pub?gid=0&single=true&output=csv';

function parseCSV(csvText: string): Member[] {
  const lines = csvText.split('\n').filter((line) => line.trim());
  const dataLines = lines.slice(3);

  const members: Member[] = [];

  for (const line of dataLines) {
    if (!line.trim() || line.split(',')[0].trim() === '') continue;

    const values: string[] = [];
    let current = '';
    let inQuotes = false;

    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    if (values[0] && values[0] !== '') {
      const meetingRoles: string[] = [];
      for (let i = 12; i < 33; i++) {
        if (values[i] && values[i] !== 'None' && values[i] !== '') {
          meetingRoles.push(values[i]);
        }
      }

      const member: Member = {
        name: values[0] || '',
        levelCompletion: parseInt(values[1]) || 0,
        projectCompletion: parseInt(values[2]) || 0,
        meetingAwards: parseInt(values[3]) || 0,
        contestExcellence: parseInt(values[4]) || 0,
        evaluationContribution: parseInt(values[5]) || 0,
        trainingPrograms: parseInt(values[6]) || 0,
        educationalSessions: parseInt(values[7]) || 0,
        mentoringAssignments: parseInt(values[8]) || 0,
        leadershipRoles: parseInt(values[9]) || 0,
        clubEvents: parseInt(values[10]) || 0,
        clubContestContribution: parseInt(values[11]) || 0,
        visitingToastmaster: parseInt(values[12]) || 0,
        meetingRolesPoints: parseInt(values[33]) || 0,
        totalPoints: parseInt(values[34]) || 0,
        aiScore: parseInt(values[34]) || 0,
        ajScore: parseInt(values[35]) || 0,
        meetingRoles,
      };

      members.push(member);
    }
  }

  return members;
}

function KPICard({
  title,
  value,
  icon: Icon,
  color,
  bgColor,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}) {
  return (
    <div
      className={`${bgColor} rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-3xl font-bold ${color} mt-1`}>{value}</p>
        </div>
        <div className={`${color} opacity-20`}>
          <Icon size={48} />
        </div>
      </div>
    </div>
  );
}

function SimpleBarChart({
  data,
  title,
  color,
}: {
  data: { name: string; value: number }[];
  title: string;
  color: string;
}) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-toastmasters-navy mb-4">{title}</h3>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-24 text-sm text-gray-600 truncate" title={item.name}>
              {item.name}
            </div>
            <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
              <div
                className={`h-full ${color} rounded-full transition-all duration-500 flex items-center justify-end pr-2`}
                style={{ width: `${Math.max((item.value / maxValue) * 100, 0)}%` }}
              >
                <span className="text-xs font-semibold text-white">{item.value}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SimplePieChart({ data }: { data: { name: string; value: number; color: string }[] }) {
  const total = data.reduce((acc, d) => acc + d.value, 0);
  let currentAngle = 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-toastmasters-navy mb-4">Points Distribution</h3>
      <div className="flex items-center gap-6">
        <div className="relative w-40 h-40">
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const strokeDasharray = `${percentage} ${100 - percentage}`;
              const strokeDashoffset = -currentAngle;
              currentAngle += percentage;

              return (
                <circle
                  key={index}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke={item.color}
                  strokeWidth="20"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-500"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold text-toastmasters-navy">{total}</p>
              <p className="text-xs text-gray-500">Total</p>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
              <span className="text-sm text-gray-600">{item.name}</span>
              <span className="text-sm font-semibold text-gray-800 ml-auto">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Member>('totalPoints');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(CSV_URL);
        if (!response.ok) throw new Error('Failed to fetch data');
        const csvText = await response.text();
        const parsedMembers = parseCSV(csvText);
        setMembers(parsedMembers);
        setLastUpdated(new Date().toLocaleString());
        setError(null);
      } catch (err) {
        setError('Failed to load member data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = useMemo(() => {
    const totalMembers = members.length;
    const totalPoints = members.reduce((acc, m) => acc + m.totalPoints, 0);
    const averagePoints = totalMembers > 0 ? Math.round(totalPoints / totalMembers) : 0;
    const totalRoles = members.reduce((acc, m) => acc + m.meetingRoles.length, 0);
    const topPerformer = members.length > 0 ? [...members].sort((a, b) => b.ajScore - a.ajScore)[0] : null;
    const activeMembers = members.filter((m) => m.totalPoints > 0).length;

    return { totalMembers, totalPoints, averagePoints, totalRoles, topPerformer, activeMembers };
  }, [members]);

  const topPerformers = useMemo(() => {
    return [...members].sort((a, b) => b.ajScore - a.ajScore).slice(0, 5);
  }, [members]);

  const filteredMembers = useMemo(() => {
    return members
      .filter((m) => m.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];
        const modifier = sortDirection === 'desc' ? -1 : 1;
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return (aVal - bVal) * modifier;
        }
        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return aVal.localeCompare(bVal) * modifier;
        }
        return 0;
      });
  }, [members, searchTerm, sortField, sortDirection]);

  const handleSort = (field: keyof Member) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const SortIcon = ({ field }: { field: keyof Member }) => {
    if (sortField !== field) return null;
    return sortDirection === 'desc' ? (
      <ChevronDown size={16} className="inline ml-1" />
    ) : (
      <ChevronUp size={16} className="inline ml-1" />
    );
  };

  const pieData = useMemo(() => {
    return [
      { name: 'Level Completion', value: members.reduce((a, m) => a + m.levelCompletion, 0), color: 'fill-toastmasters-navy' },
      { name: 'Project Completion', value: members.reduce((a, m) => a + m.projectCompletion, 0), color: 'fill-toastmasters-maroon' },
      { name: 'Meeting Awards', value: members.reduce((a, m) => a + m.meetingAwards, 0), color: 'fill-toastmasters-gold' },
      { name: 'Contest Excellence', value: members.reduce((a, m) => a + m.contestExcellence, 0), color: 'fill-toastmasters-navy-light' },
      { name: 'Leadership Roles', value: members.reduce((a, m) => a + m.leadershipRoles, 0), color: 'fill-toastmasters-maroon-light' },
    ].filter(d => d.value > 0);
  }, [members]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-toastmasters-navy via-toastmasters-navy-light to-toastmasters-navy flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-toastmasters-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading member data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-toastmasters-navy via-toastmasters-navy-light to-toastmasters-navy flex items-center justify-center">
        <div className="text-center bg-white rounded-xl p-8 shadow-xl max-w-md">
          <div className="text-toastmasters-maroon text-6xl mb-4">!</div>
          <p className="text-gray-800 text-lg font-semibold mb-2">Error Loading Data</p>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-toastmakers-navy text-white rounded-lg hover:bg-toastmasters-navy-light transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-toastmasters-navy via-toastmasters-navy-light to-toastmasters-navy text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Crown className="text-toastmasters-gold" size={40} />
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                  Central Link Toastmasters Club
                </h1>
              </div>
              <p className="text-toastmasters-gold-light text-lg sm:text-xl">
                Member Dashboard
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Calendar size={16} />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KPICard
            title="Total Members"
            value={stats.totalMembers}
            icon={Users}
            color="text-toastmasters-navy"
            bgColor="bg-gradient-to-br from-blue-50 to-blue-100"
          />
          <KPICard
            title="Total Points"
            value={stats.totalPoints.toLocaleString()}
            icon={Trophy}
            color="text-toastmasters-gold"
            bgColor="bg-gradient-to-br from-yellow-50 to-yellow-100"
          />
          <KPICard
            title="Average Points"
            value={stats.averagePoints}
            icon={Target}
            color="text-toastmasters-maroon"
            bgColor="bg-gradient-to-br from-red-50 to-red-100"
          />
          <KPICard
            title="Active Members"
            value={stats.activeMembers}
            icon={TrendingUp}
            color="text-green-700"
            bgColor="bg-gradient-to-br from-green-50 to-green-100"
          />
        </div>

        {stats.topPerformer && (
          <div className="bg-gradient-to-r from-toastmasters-gold via-toastmasters-gold-light to-toastmasters-gold rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="bg-white rounded-full p-3 shadow-md">
                <Crown className="text-toastmasters-gold" size={32} />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-toastmasters-navy text-sm font-semibold">Top Performer</p>
                <p className="text-toastmasters-navy-dark text-xl font-bold">{stats.topPerformer.name}</p>
                <p className="text-toastmasters-navy">{stats.topPerformer.ajScore} points</p>
              </div>
              <div className="sm:ml-auto flex flex-wrap justify-center gap-2">
                {stats.topPerformer.meetingRoles.slice(0, 4).map((role, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-toastmasters-navy text-white text-xs rounded-full"
                  >
                    {role}
                  </span>
                ))}
                {stats.topPerformer.meetingRoles.length > 4 && (
                  <span className="px-3 py-1 bg-toastmasters-navy text-white text-xs rounded-full">
                    +{stats.topPerformer.meetingRoles.length - 4} more
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mb-8">
          <SimpleBarChart
            data={topPerformers.map((m) => ({ name: m.name.split(' ')[0], value: m.ajScore }))}
            title="Top 5 Performers"
            color="bg-gradient-to-r from-toastmasters-navy to-toastmasters-navy-light"
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="p-4 sm:p-6 bg-gradient-to-r from-toastmasters-navy to-toastmasters-navy-light">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex items-center gap-2">
                <GraduationCap className="text-toastmasters-gold" size={24} />
                <h2 className="text-xl font-semibold text-white">Member Performance</h2>
              </div>
              <div className="relative w-full sm:w-auto">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-toastmasters-gold focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    className="px-4 py-3 text-left text-xs font-semibold text-toastmasters-navy uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('name')}
                  >
                    Name <SortIcon field="name" />
                  </th>
                  <th
                    className="px-4 py-3 text-center text-xs font-semibold text-toastmasters-navy uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('levelCompletion')}
                  >
                    Level <SortIcon field="levelCompletion" />
                  </th>
                  <th
                    className="px-4 py-3 text-center text-xs font-semibold text-toastmasters-navy uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('projectCompletion')}
                  >
                    Projects <SortIcon field="projectCompletion" />
                  </th>
                  <th
                    className="px-4 py-3 text-center text-xs font-semibold text-toastmasters-navy uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('meetingAwards')}
                  >
                    Awards <SortIcon field="meetingAwards" />
                  </th>
                  <th
                    className="px-4 py-3 text-center text-xs font-semibold text-toastmasters-navy uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('leadershipRoles')}
                  >
                    Leadership <SortIcon field="leadershipRoles" />
                  </th>
                  <th
                    className="px-4 py-3 text-center text-xs font-semibold text-toastmasters-navy uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('aiScore')}
                  >
                    Roles Pts <SortIcon field="aiScore" />
                  </th>
                  <th
                    className="px-4 py-3 text-center text-xs font-semibold text-toastmasters-navy uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('ajScore')}
                  >
                    Total <SortIcon field="ajScore" />
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredMembers.map((member, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{member.name}</div>
                      <div className="text-xs text-gray-500 flex flex-wrap gap-1 mt-1">
                        {member.meetingRoles.slice(0, 3).map((role, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-toastmasters-navy/10 text-toastmasters-navy rounded text-xs"
                          >
                            {role}
                          </span>
                        ))}
                        {member.meetingRoles.length > 3 && (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                            +{member.meetingRoles.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {member.levelCompletion}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {member.projectCompletion}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        {member.meetingAwards}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {member.leadershipRoles}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        {member.aiScore}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${
                          member.ajScore > 100
                            ? 'bg-toastmasters-gold text-toastmasters-navy'
                            : member.ajScore > 50
                            ? 'bg-toastmasters-navy text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {member.ajScore}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredMembers.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No members found matching "{searchTerm}"
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-toastmasters-maroon to-toastmasters-maroon-light rounded-xl p-6 text-white text-center">
          <Star className="mx-auto mb-2 text-toastmakers-gold" size={24} />
          <p className="text-sm">
            "Where Leaders Are Made" - Track your progress and achievements with Central Link
            Toastmasters Club
          </p>
        </div>
      </main>

      <footer className="bg-toastmasters-navy text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-300">
            Central Link Toastmasters Club Member Dashboard
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Data refreshes automatically from Google Sheets
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
