import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Ensure this path is correct

// Sample data representing the organization
const organization = {
  name: "Alice",
  role: "CEO",
  avatar: "/avatars/alice.png",
  fallback: "A",
  subordinates: [
    {
      name: "Bob",
      role: "CTO",
      avatar: "/avatars/bob.png",
      fallback: "B",
      subordinates: [
        {
          name: "Charlie",
          role: "Lead Developer",
          avatar: "/avatars/charlie.png",
          fallback: "C",
          subordinates: [],
        },
        {
          name: "Charlie",
          role: "Lead Developer",
          avatar: "/avatars/charlie.png",
          fallback: "C",
          subordinates: [],
        },
        {
          name: "Charlie",
          role: "Lead Developer",
          avatar: "/avatars/charlie.png",
          fallback: "C",
          subordinates: [],
        },
      ],
    },
    {
      name: "Diana",
      role: "CMO",
      avatar: "/avatars/diana.png",
      fallback: "D",
      subordinates: [
        {
          name: "Charlie",
          role: "Lead Developer",
          avatar: "/avatars/charlie.png",
          fallback: "C",
          subordinates: [],
        },
        {
          name: "Charlie",
          role: "Lead Developer",
          avatar: "/avatars/charlie.png",
          fallback: "C",
          subordinates: [
            {
              name: "Charlie",
              role: "Lead Developer",
              avatar: "/avatars/charlie.png",
              fallback: "C",
              subordinates: [],
            },
          ],
        },
      ],
    },
  ],
};

// Recursive component to render a person and their subordinates
function Person({ person }: { person: typeof organization }) {
  return (
    <div className="flex flex-col items-center">
      {/* Person card */}
      <div className="group relative">
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100 hover:shadow-lg transition-all duration-200 hover:border-blue-200 w-52 z-10">
          <div className="flex flex-col items-center">
            <div className="relative mb-2">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <Avatar className="h-16 w-16 ring-2 ring-offset-2 ring-blue-100 transition-all duration-300 group-hover:ring-blue-300">
                <AvatarImage src={person.avatar} alt={person.name} />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium">
                  {person.fallback}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="text-center">
              <h3 className="font-medium text-gray-900">{person.name}</h3>
              <p className="text-sm text-gray-500">{person.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subordinates container */}
      {person.subordinates.length > 0 && (
        <>
          {/* Vertical line down from person */}
          <div className="w-0.5 h-8 bg-blue-300"></div>

          {/* Horizontal container for subordinates */}
          <div className="flex gap-12 relative">
            {/* Horizontal line connecting all subordinates */}
            {person.subordinates.length > 1 && (
              <div
                className="absolute h-0.5 bg-blue-300 top-0"
                style={{
                  left: `${person.subordinates.length > 1 ? "0px" : "50%"}`,
                  right: `${person.subordinates.length > 1 ? "0px" : "50%"}`,
                }}></div>
            )}

            {/* Render each subordinate */}
            {person.subordinates.map((subordinate, index) => (
              <div key={index} className="flex flex-col items-center">
                {/* Vertical line above subordinate */}
                <div className="w-0.5 h-8 bg-blue-300"></div>
                <Person person={subordinate} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function OrganizationalChart() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8 overflow-auto">
      <div className="mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-2 border-gray-200">
          Organizational Chart
        </h1>
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-blue-100 inline-block">
          <Person person={organization} />
        </div>
      </div>
    </div>
  );
}
