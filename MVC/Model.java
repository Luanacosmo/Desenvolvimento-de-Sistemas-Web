public class Model {

    private double num1 = 0;
    private double num2 = 0;
    private double resultado = 0;

    public void setNumeros(double n1, double n2){
        this.num1 = n1;
        this.num2 = n2;
    }

    public void calcula(){
        resultado = num1 + num2;
    }

    public double getResultado(){
        return resultado;
    }
}
