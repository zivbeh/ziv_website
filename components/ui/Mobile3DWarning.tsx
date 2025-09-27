"use client";

type Mobile3DWarningProps = {
  onClose: () => void;
};

export function Mobile3DWarning({ onClose }: Mobile3DWarningProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[500] flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 md:p-8 max-w-lg w-full text-center shadow-2xl">
        <img
          src="/3dportfolio.png"
          alt="3D Portfolio Preview"
          className="rounded-lg mb-6 w-full h-auto"
        />
        <h2 className="text-2xl font-bold text-white mb-3">3D View is for Desktops</h2>
        <p className="text-gray-300 mb-6">
          The interactive 3D portfolio is best experienced on a larger screen. Please visit on a computer for the full experience.
        </p>
        <button
          onClick={onClose}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors"
        >
          Back to Portfolio
        </button>
      </div>
    </div>
  );
}
