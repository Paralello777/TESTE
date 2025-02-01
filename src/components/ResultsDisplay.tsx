import { Card } from "@/components/ui/card";
import { SearchResult } from "@/services/searchService";
import { CircleDollarSign, Package, ShoppingCart, Wallet } from "lucide-react";

interface ResultsDisplayProps {
  result: SearchResult | null;
  isLoading: boolean;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const ResultCard = ({ 
  title, 
  value, 
  icon: Icon, 
  isLoading 
}: { 
  title: string; 
  value: string | number; 
  icon: any;
  isLoading: boolean;
}) => (
  <Card className="p-6 flex flex-col items-center justify-center space-y-2">
    <div className="rounded-full bg-primary/10 p-3">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <h3 className="font-medium text-sm text-muted-foreground">{title}</h3>
    <p className={`text-2xl font-bold ${isLoading ? "animate-pulse-slow" : ""}`}>
      {isLoading ? "..." : value}
    </p>
  </Card>
);

export const ResultsDisplay = ({ result, isLoading }: ResultsDisplayProps) => {
  if (!result && !isLoading) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl mx-auto mt-8">
      <ResultCard
        title="Faturamento"
        value={result ? formatCurrency(result.faturamento) : 0}
        icon={CircleDollarSign}
        isLoading={isLoading}
      />
      <ResultCard
        title="Quantidade de Itens"
        value={result ? result.quantidadeItens : 0}
        icon={Package}
        isLoading={isLoading}
      />
      <ResultCard
        title="Quantidade de Vendas"
        value={result ? result.quantidadeVendas : 0}
        icon={ShoppingCart}
        isLoading={isLoading}
      />
      <ResultCard
        title="Despesas"
        value={result ? formatCurrency(result.despesas) : 0}
        icon={Wallet}
        isLoading={isLoading}
      />
    </div>
  );
};