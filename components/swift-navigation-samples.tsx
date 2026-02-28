import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

const routeExample = `import SwiftUINavigation

enum AppRoutes: Route {
  case home
  case details(id: String)
  case settings

  var name: String {
    switch self {
    case .home: return "Home"
    case .details: return "Details"
    case .settings: return "Settings"
    }
  }

  var params: any RouteParams {
    switch self {
    case .details(let id): return id
    default: return EmptyParams()
    }
  }
}`;

const stackExample = `import SwiftUI
import SwiftUINavigation

struct ContentView: View {
  let Stack = createStackNavigator(AppRoutes.self)

  var body: some View {
    NavigationContainer {
      Stack.Navigator(initialRoute: .home) {
        Stack.Screen(route: .home) { _, _ in HomeView() }

        Stack.Screen(
          route: .details(id: ""),
          options: ScreenOptions(title: "Details")
        ) { _, route in
          if let id = route.params as? String {
            DetailsView(id: id)
          }
        }
      }
    }
  }
}`;

const tabAndSheetExample = `struct MainTabView: View {
  let Tab = createTabNavigator(AppRoutes.self)

  var body: some View {
    Tab.Navigator(initialRoute: .home) {
      Tab.Screen(route: .home) { _, _ in HomeView() }
      Tab.Screen(route: .settings) { _, _ in SettingsView() }
    }
  }
}

struct DetailsView: View {
  var body: some View {
    SheetButtonView(data: "Context") {
      Text("Open Sheet")
    } content: { context in
      Text("Sheet: \(context.item.data)")
    }
  }
}`;

export function SwiftNavigationSamples() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Swift UI Navigation Samples
          <Badge variant="secondary">README-Based</Badge>
        </CardTitle>
        <CardDescription>
          Static examples derived from your <code>swift-ui-navigation</code> repository docs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="routes">
            <AccordionTrigger>1) Define Routes</AccordionTrigger>
            <AccordionContent>
              <pre className="overflow-x-auto rounded-md border bg-muted/30 p-3 text-[11px] leading-relaxed">
                {routeExample}
              </pre>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="stack">
            <AccordionTrigger>2) Stack Navigation</AccordionTrigger>
            <AccordionContent>
              <pre className="overflow-x-auto rounded-md border bg-muted/30 p-3 text-[11px] leading-relaxed">
                {stackExample}
              </pre>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="tab-sheet">
            <AccordionTrigger>3) Tab + Sheet Patterns</AccordionTrigger>
            <AccordionContent>
              <pre className="overflow-x-auto rounded-md border bg-muted/30 p-3 text-[11px] leading-relaxed">
                {tabAndSheetExample}
              </pre>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
