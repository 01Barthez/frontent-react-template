import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../shared/ui/Button';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Bienvenue sur notre plateforme
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Découvrez notre nouvelle architecture applicative moderne et performante.
          </p>
          <div className="space-x-4">
            <Link to="/menu">
              <Button size="lg">Voir le menu</Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="lg">
                Mon compte
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// named export at declaration
