import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle, AlertCircle } from "lucide-react";

interface SafetyScoreDisplayProps {
  score: number;
  status: "pure" | "adulterated" | "inconclusive";
  adulterants?: string[];
}

export function SafetyScoreDisplay({ score, status, adulterants = [] }: SafetyScoreDisplayProps) {
  // Determine color scheme based on status
  const colorScheme = {
    pure: {
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      borderColor: "border-green-200",
      progressColor: "bg-green-500",
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      label: "Safe",
    },
    inconclusive: {
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-700",
      borderColor: "border-yellow-200",
      progressColor: "bg-yellow-500",
      icon: <AlertCircle className="w-6 h-6 text-yellow-500" />,
      label: "Caution",
    },
    adulterated: {
      bgColor: "bg-red-50",
      textColor: "text-red-700",
      borderColor: "border-red-200",
      progressColor: "bg-red-500",
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      label: "Unsafe",
    },
  };

  const { bgColor, textColor, borderColor, progressColor, icon, label } = colorScheme[status];

  return (
    <Card className={`${bgColor} ${borderColor} border-2 overflow-hidden`}>
      <CardContent className="p-6">
        <div className="flex flex-col items-center">
          <div className="mb-4">{icon}</div>
          <h3 className={`text-xl font-bold ${textColor} mb-1`}>{label}</h3>
          <p className={`text-sm ${textColor} mb-4 opacity-80`}>
            Safety Score: {score}/100
          </p>
          
          {/* Circular progress indicator */}
          <div className="relative w-32 h-32 mb-4">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={status === "pure" ? "#22c55e" : status === "inconclusive" ? "#eab308" : "#ef4444"}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - score / 100)}`}
                transform="rotate(-90 50 50)"
              />
              
              {/* Score text */}
              <text
                x="50"
                y="50"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize="24"
                fontWeight="bold"
                fill={status === "pure" ? "#22c55e" : status === "inconclusive" ? "#eab308" : "#ef4444"}
              >
                {score}
              </text>
              
              <text
                x="50"
                y="65"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize="12"
                fill="#6b7280"
              >
                /100
              </text>
            </svg>
          </div>
          
          {/* Status badge */}
          <Badge 
            className={`mb-4 ${
              status === "pure" 
                ? "bg-green-100 text-green-800 hover:bg-green-100" 
                : status === "adulterated" 
                  ? "bg-red-100 text-red-800 hover:bg-red-100" 
                  : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
            }`}
          >
            {status === "pure" ? "Pure" : status === "adulterated" ? "Adulterated" : "Inconclusive"}
          </Badge>
          
          {/* Adulterants if any */}
          {adulterants.length > 0 && (
            <div className="w-full">
              <p className={`text-xs font-medium ${textColor} mb-2`}>
                {status === "adulterated" ? "Detected Adulterants:" : "Potential Concerns:"}
              </p>
              <div className="flex flex-wrap gap-1">
                {adulterants.map((adulterant) => (
                  <Badge 
                    key={adulterant} 
                    variant="outline" 
                    className={`text-xs ${
                      status === "adulterated" 
                        ? "border-red-200 text-red-700" 
                        : "border-yellow-200 text-yellow-700"
                    }`}
                  >
                    {adulterant}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}