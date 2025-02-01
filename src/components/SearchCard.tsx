import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchResult, searchById } from "@/services/searchService";
import { useToast } from "@/components/ui/use-toast";

interface SearchCardProps {
  onResultFound: (result: SearchResult) => void;
  onSearchStart: () => void;
}

export const SearchCard = ({ onResultFound, onSearchStart }: SearchCardProps) => {
  const [searchId, setSearchId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validateId = (id: string) => {
    const regex = /^[A-Z]{3}\/2024$/;
    return regex.test(id);
  };

  const handleSearch = async () => {
    if (!validateId(searchId)) {
      toast({
        variant: "destructive",
        title: "Formato inválido",
        description: "O ID deve estar no formato XXX/2024",
      });
      return;
    }

    setIsLoading(true);
    onSearchStart();

    try {
      const result = await searchById(searchId);
      onResultFound(result);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro na busca",
        description: error instanceof Error ? error.message : "Erro desconhecido",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 w-full max-w-md mx-auto">
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-center">Pesquisa por ID</h2>
          <p className="text-sm text-muted-foreground text-center">
            Digite o ID no formato XXX/2024
          </p>
        </div>
        <div className="flex space-x-2">
          <Input
            placeholder="Ex: ABC/2024"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value.toUpperCase())}
            className="flex-1"
            maxLength={8}
          />
          <Button onClick={handleSearch} disabled={isLoading}>
            {isLoading ? "Buscando..." : "Buscar"}
          </Button>
        </div>
      </div>
    </Card>
  );
};