"use client"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { ArrowLeft, Check, X, FileText } from "lucide-react"
import React from "react"
import {getcotacoes,Cotacao} from "@/lib/data3"
// import { useToast } from "use-toast"

export default function CotacaoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter()
//   const { toast } = useToast()

//   const { getCotacao, aprovarCotacao, rejeitarCotacao } = useCotacaoStore()
const [cotacao, getCotacao]=useState<Cotacao[]>([])
  
  const [confirmDialog, setConfirmDialog] = useState(false)
  
    useEffect(() => {
      async function getd(){
    //   const result=await getData()
    const result=await getcotacoes(id)

  const cotacao = result[0]

  
      }
      getd()
        
    }, [])
  
  if (!cotacao) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Cotação não encontrada</h2>
          <Button onClick={() => router.push("/")}>Voltar</Button>
        </div>
      </div>
    )
  }

  const handleApprove = () => {
//     aprovarCotacao(id)
//     toast({
//       title: "Cotação aprovada!",
//       description: `A cotação nº ${cotacao.numero_cotacao} foi aprovada com sucesso.`,
//     })
//     setConfirmDialog(false)
//   }

//   const handleReject = () => {
//     rejeitarCotacao(id)
//     toast({
//       title: "Cotação rejeitada",
//       description: `A cotação nº ${cotacao.numero_cotacao} foi rejeitada.`,
//       variant: "destructive",
//     })
  }

  const statusBadge = () => {
    if (cotacao.status === "approved")
      return (
        <Badge className="bg-primary">
          <Check className="h-3 w-3 mr-1" />
          Aprovada
        </Badge>
      )
    if (cotacao.status === "rejected")
      return (
        <Badge variant="destructive">
          <X className="h-3 w-3 mr-1" />
          Rejeitada
        </Badge>
      )
    return <Badge variant="secondary">Pendente</Badge>
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="ghost" onClick={() => router.push("/")} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para lista
        </Button>

        {
          cotacoes.map((cotacao) => {
            return(

        <Card>
          <CardHeader className="flex justify-between items-center">
            <div>
              <CardTitle className="text-3xl">
                Cotação Nº {cotacao.id}
              </CardTitle>
              <p className="text-muted-foreground">
                Fornecedor: <strong>{cotacao.fornecedor}</strong>
              </p>
            </div>
            {statusBadge()}
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <p><strong>Valor Cotado:</strong> R$ {cotacao.valor_cotado?.toFixed(2)}</p>
              <p><strong>Prazo de Entrega:</strong> {cotacao.prazo_entrega}</p>
              <p><strong>Condições de Pagamento:</strong> {cotacao.condicoes_pagamento}</p>
              <p><strong>Data da Cotação:</strong> {new Date(cotacao.data_cotacao).toLocaleDateString("pt-BR")}</p>
              <p><strong>Marca/Amostra:</strong> {cotacao.marca_amostra || "—"}</p>
              <p><strong>Item Desenvolvido:</strong> {cotacao.item_desenvolvido ? "Sim" : "Não"}</p>
            </div>

            {cotacao.observacoes && (
              <div>
                <h4 className="font-semibold mb-1 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Observações
                </h4>
                <p className="text-sm text-muted-foreground">{cotacao.observacoes}</p>
              </div>
            )}

            {cotacao.status === "pending" && (
              <div className="flex gap-3 mt-6">
                <Button onClick={() => setConfirmDialog(true)} className="flex-1">
                  <Check className="h-4 w-4 mr-2" />
                  Aprovar Cotação
                </Button>
                <Button onClick={handleReject} variant="destructive" className="flex-1">
                  <X className="h-4 w-4 mr-2" />
                  Rejeitar
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        )}
        <AlertDialog open={confirmDialog} onOpenChange={setConfirmDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar Aprovação</AlertDialogTitle>
              <AlertDialogDescription>
                Deseja aprovar a cotação nº <strong>{cotacao.numero_cotacao}</strong>?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleApprove}>Aprovar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
