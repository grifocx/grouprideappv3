import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bike, Map, Users, Calendar, MapPin, Gauge, Mountain, ChevronRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <Bike className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">GroupRideApp</span>
          </div>
          <Button variant="default" data-testid="button-get-started" asChild>
            <Link href="/auth">
              Get Started
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="container mx-auto px-4 py-24 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="text-sm">
              Connect with local cyclists
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Find Your Perfect
              <span className="block text-primary mt-2">Group Ride</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover cycling events tailored to your preferences. Connect with riders who match your style, pace, and terrain preferences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="w-full sm:w-auto" data-testid="button-join-now" asChild>
                <Link href="/auth">
                  Join the Community
                  <ChevronRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto" data-testid="button-browse-rides" asChild>
                <Link href="/auth">
                  Browse Rides
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-muted-foreground text-lg">Powerful features to connect with your cycling community</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover-elevate">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Map className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
              <p className="text-muted-foreground">
                Visualize rides on an interactive map. See exactly where each ride starts and explore routes in your area.
              </p>
            </Card>

            <Card className="p-6 hover-elevate">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
              <p className="text-muted-foreground">
                Filter by ride type, difficulty, pace, and terrain to find rides that match your skill level and preferences.
              </p>
            </Card>

            <Card className="p-6 hover-elevate">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Planning</h3>
              <p className="text-muted-foreground">
                Organize group rides with detailed information about routes, meeting points, and participant limits.
              </p>
            </Card>

            <Card className="p-6 hover-elevate">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Location-Based</h3>
              <p className="text-muted-foreground">
                Find rides near you with customizable search radius. Never miss a local cycling event.
              </p>
            </Card>

            <Card className="p-6 hover-elevate">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Gauge className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pace Matching</h3>
              <p className="text-muted-foreground">
                Choose from leisurely to fast-paced rides. Find groups that match your speed and endurance level.
              </p>
            </Card>

            <Card className="p-6 hover-elevate">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Mountain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">All Disciplines</h3>
              <p className="text-muted-foreground">
                Whether you're into MTB, road cycling, or gravel grinding, find your tribe and hit the trails.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Ride Types Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Adventure</h2>
            <p className="text-muted-foreground text-lg">Whatever your riding style, we've got you covered</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 text-center hover-elevate">
              <div className="text-4xl font-bold text-primary mb-2">MTB</div>
              <div className="text-lg font-semibold mb-2">Mountain Biking</div>
              <p className="text-muted-foreground">
                Hit the trails with fellow mountain bikers. From XC to enduro, find your next adventure.
              </p>
            </Card>

            <Card className="p-8 text-center hover-elevate">
              <div className="text-4xl font-bold text-primary mb-2">Road</div>
              <div className="text-lg font-semibold mb-2">Road Cycling</div>
              <p className="text-muted-foreground">
                Join road rides and group training sessions. Perfect for speed enthusiasts and endurance riders.
              </p>
            </Card>

            <Card className="p-8 text-center hover-elevate">
              <div className="text-4xl font-bold text-primary mb-2">Gravel</div>
              <div className="text-lg font-semibold mb-2">Gravel Rides</div>
              <p className="text-muted-foreground">
                Explore mixed terrain adventures. The best of both worlds for versatile riders.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Ride?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join GroupRideApp today and discover your next cycling adventure. Connect with riders, organize events, and never ride alone.
          </p>
          <Button size="lg" variant="secondary" data-testid="button-cta-signup" asChild>
            <Link href="/auth">
              Create Free Account
              <ChevronRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center">
                <Bike className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">GroupRideApp</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 GroupRideApp. Connecting cyclists, one ride at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
