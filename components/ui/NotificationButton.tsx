import { Bell } from "lucide-react"; // or your icon library
import { Button } from "./button" // adjust path as needed
import { Badge } from "./badge"; // adjust path as needed
import { Link } from 'react-router-dom';

const navigation = [
  {Button, icon: Bell, path: '/notifications' },
]

export function NotificationButton({ count = 0 }) {
  return (
    <Button variant="ghost" size="sm" className="relative">
        
        <Bell className="text-black-500" />
      <Link to="/notifications"/>
      {count > 0 && (
        <Badge className="absolute -top-1 -right-1 h-[1.5rem] w-[1.5rem] rounded-full bg-red-500 text-[0.75rem] p-0 flex items-center justify-center">
          {count > 10 ? "10+" : count}
        </Badge>
      )}
    </Button>
  );
}